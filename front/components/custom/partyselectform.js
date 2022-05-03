import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
  Row,
  Col,
} from "reactstrap";
const PartySelect = () => {
  const router = useRouter();
 const {id} = router.query;
   return (
    <div className="topbar" id="top">
      <div className="party_header6">
        <div className="party_header">
              <div className="partymenu">
                <div className="partymenu-item">
                  <Link href={`/party/${id}/info`}>
                   <a>
                      정보                    </a>
                  </Link>
                  </div>
                  <div className="partymenu-item">
                  <Link href={`/party/${id}/board`}>
                    <a>
                      게시판
                    </a>
                  </Link>
                  </div>    
                <div className="partymenu-item">
                <Link href={`/party/${id}/schedule`}>
                    <a>
                      일정
                    </a>
                    </Link>
                    </div>
                </div>  
        </div>
      </div>
    </div>
  );
};

export default PartySelect;