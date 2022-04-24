import { useRouter } from "next/router";

const PostView = ({board_id},{ history }) => {
  const exam={
    "no": board_id,
    "title": "첫번째 게시글입니다.",
    "content": "첫번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 6
  }
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h2 align="center">게시글 상세정보</h2>

      <div className="post-view-wrapper">
        {
            <div>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{ exam.no }</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{ exam.title }</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{ exam.createDate }</label>
              </div>
              <div className="post-view-row">
                <label>조회수</label>
                <label>{ exam.readCount }</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {
                    exam.content
                  }
                </div>
              </div>
            </div>
          }
        <button className="post-view-go-list-btn"
        onClick={(event)=>{
          event.preventDefault();
          location.href=`/party/${id}/board`
          }}>
        목록으로 돌아가기</button>
        <button className="post-view-delete-btn"
        onClick={(event)=>{
          event.preventDefault();
          }}>
        삭제</button>
      </div>
    </div>
  )
}

export default PostView;