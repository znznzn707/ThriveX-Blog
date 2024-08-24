import Author from "./Author"
import HotArticle from "./HotArticle"
import RandomArticle from "./RandomArticle"
import Comment from "./Comment"

export default () => {
  return (
    <>
      <div className="right">
        {/* 作者介绍 */}
        <Author></Author>
        {/* 随机推荐 */}
        <RandomArticle></RandomArticle>
        {/* 热门文章 */}
        <HotArticle></HotArticle>
        {/* 最新评论 */}
        <Comment></Comment>
      </div>
    </>
  )
}