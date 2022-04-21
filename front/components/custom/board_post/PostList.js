import React, { useState, useEffect } from 'react';
import Link from "next/link";
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import { postList } from './Data';
const PostList = props => {
  const [ dataList, setDataList ] = useState([]);
  useEffect(() => {
    setDataList(postList);
  }, [ ])
  return (
    <>
      <CommonTable headersName={['글번호', '제목', '등록일', '조회수']}>
        {
          dataList ? dataList.map((item, index) => {
          
            return (
                <CommonTableRow key={index}>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${item.no}`}>
                <a>
                  { item.no }
                </a>
                </Link>
                </CommonTableColumn>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${item.no}`}>
                <a>  
                  { item.title }
                  </a>
                </Link>  
                </CommonTableColumn>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${item.no}`}>
                <a>    
                  { item.createDate }
                  </a>
                </Link>  
                </CommonTableColumn>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${item.no}`}>
                <a>    
                { item.readCount }
                </a>
                </Link>  
                </CommonTableColumn>        
                </CommonTableRow>
              
            )
          }) : ''
        }
      </CommonTable>
    </>
  )
}
export default PostList;