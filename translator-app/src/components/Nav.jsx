import React from 'react';
import styled from 'styled-components';

import navLogo from '../assets/logo.png';
import { isLoggedIn, logout } from '../services/auth';

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 2px 1px #ddd;
    padding: 20px;
`;

const Logo = styled.img`
    width: 150px;
    cursor: pointer;
`;

const NavItem = styled.span`
    color: rgb(236, 72, 22);
    cursor: pointer;
    margin-right: 20px;
`;

const Nav = () => {
    const loggedInItems = [{'text': 'Dashboard', action: () => window.location.assign('/dashboard')}, {'text': 'Logout', action: logout}];

    const buildNavItems = (items) => {
        return items.map(item => <NavItem onClick={item.action}>{item.text}</NavItem>)
    }

    return (
        <NavWrapper>
            <Logo src={navLogo} onClick={() => window.location.assign('/')}/>
            {isLoggedIn() && <div>{buildNavItems(loggedInItems)}</div>}
        </NavWrapper>
    )
};

export default Nav;