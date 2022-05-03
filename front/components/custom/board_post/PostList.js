import React, { useState, useEffect } from 'react';
import Link from "next/link";
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import axios from 'axios';

const PostList = props => {
  const [postList,setPostList]=useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/party/${props.id}/partyboard`)
        .then(function (response) {
          if(response.status == 200){
            setPostList(response.data)
                                        console.log(postList)
                                    }
                            }).catch(function (error) {
                                    console.log(error);
                                });
    }, []);

return (
    <>
      <CommonTable headersName={['글번호', '제목','작성자','등록일', '카테고리']}>
        {
          postList ? postList.map((p, index) => {
            let category = undefined;
            if(p.category=="NOTICE")
              category = "공지";
            else if(p.category=="BASIC")
              category = "자유";

            return (
                <CommonTableRow key={index}>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${p.id}/info`}>
                <a>
                  { p.id }
                </a>
                </Link>
                </CommonTableColumn>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${p.id}/info`}>
                <a>  
                  { p.title }
                  </a>
                </Link>  
                </CommonTableColumn>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${p.id}/info`}>
                <a>  
                  { p.nickName }
                  </a>
                </Link>  
                </CommonTableColumn>
                
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${p.id}/info`}>
                <a>    
                  { p.sinceDate }
                  </a>
                </Link>  
                </CommonTableColumn>
                <CommonTableColumn>
                <Link href={`/party/${props.id}/board/${p.id}/info`}>
                <a>    
                { category }
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