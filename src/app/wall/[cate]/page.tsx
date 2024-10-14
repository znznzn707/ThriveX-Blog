import Link from 'next/link';
import Pagination from '@/components/Pagination';
import AddWallInfo from '../components/AddWallInfo';
import { getCateListAPI, getCateWallListAPI } from "@/api/wall";
import dayjs from 'dayjs';

interface Props {
    params: { cate: string };
    searchParams: { page: number }
}

export default async ({ params, searchParams }: Props) => {
    const cate = params.cate
    const page = searchParams.page || 1;

    const active = "!text-primary !border-primary"

    // 提前把颜色写好，否则会导致样式丢失
    const colors = ["bg-[#fcafa24d]", "bg-[#a8ed8a4d]", "bg-[#caa7f74d]", "bg-[#ffe3944d]", "bg-[#92e6f54d]"]

    const { data: cateList } = await getCateListAPI()

    const id = cateList.find(item => item.mark === cate)?.id!
    const { data: tallList } = await getCateWallListAPI(id, page)

    return (
        <>
            <title>留言墙</title>
            <meta name="description" content="留言墙" />

            <div className='bg-white dark:bg-black-a py-16 border-b dark:border-[#4e5969] transition-colors'>
                <div className="flex flex-col items-center">
                    <h2 className="text-5xl pt-24">留言墙</h2>
                    <p className="text-sm text-gray-600 my-10">有什么想对我说的，来吧</p>
                </div>

                <ul className="flex flex-col md:flex-row justify-center text-sm space-y-1 md:space-y-0">
                    {
                        cateList?.map(item => (
                            <li key={item.id} className={`py-2 px-4 mx-1 dark:text-[#8c9ab1] border-2 border-transparent rounded-full hover:!text-primary hover:border-primary ${item.mark === cate ? active : ''} transition-colors`}>
                                <Link href={`/wall/${item.mark}`}>{item.name}</Link>
                            </li>
                        ))
                    }
                </ul>

                <div className='w-[90%] xl:w-[1200px] mx-auto mt-12 grid grid-cols-1 gap-1 xs:grid-cols-2 xs:gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4'>
                    {
                        tallList.result?.map(item => (
                            <div key={item.id} className={`relative flex flex-col py-2 px-4 bg-[${item.color}] rounded-lg top-0 hover:-top-2 transition-all`}>
                                <div className='flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-[#8c9ab1]'>
                                    <span>{dayjs(+item.createTime!).format('YYYY-MM-DD HH:mm')}</span>
                                    <span>{item.cate.name}</span>
                                </div>

                                <div className='overflow-auto h-32 text-sm my-4 text-gray-700 dark:text-[#cecece]'>{item.content}</div>

                                <div className='text-end text-[#5b5b5b] dark:text-[#A0A0A0]'>{item.name ? item.name : "匿名"}</div>
                            </div>
                        ))
                    }
                </div>

                <Pagination total={tallList.pages} page={page} className="flex justify-center mt-5" />

                <AddWallInfo />
            </div>
        </>
    )
}