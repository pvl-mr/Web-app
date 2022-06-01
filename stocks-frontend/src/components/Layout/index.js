import { useLocation } from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";

import {Content, FooterWrapper, HeaderWrapper, NavLink, Wrapper} from "./styles";
import paths from "../../constants/paths";

function Layout({children}) {
    const { pathname } = useLocation();
    const status = localStorage.getItem('status');
    return (
        <Wrapper>
            <HeaderWrapper>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href={paths.MAIN}>INVESTMENT</Navbar.Brand>
                        <Nav className="me-auto">
                            {status === 'analyst' ? (
                                <>
                                    <NavLink to={paths.ANALYST_PORTFOLIO} isActive={pathname === paths.ANALYST_PORTFOLIO}>Портфели</NavLink>
                                    <NavLink to={paths.PROFILE} isActive={pathname === paths.PROFILE}>Профиль</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to={paths.PORTFOLIO} isActive={pathname === paths.PORTFOLIO}>Портфели</NavLink>
                                    <NavLink to={paths.STOCKS} isActive={pathname === paths.STOCKS}>Акции</NavLink>
                                    <NavLink to={paths.BONDS} isActive={pathname === paths.BONDS}>Облигации</NavLink>
                                    <NavLink to={paths.PROFILE} isActive={pathname === paths.PROFILE}>Профиль</NavLink>
                                </>
                            )}
                        </Nav>
                    </Container>
                </Navbar>
            </HeaderWrapper>
            <Content>
                {children}
            </Content>
            <FooterWrapper>
                <div>г. Ульяновск, Северный Венец 32</div>
                <div>Все права защищены © 2022</div>
            </FooterWrapper>
        </Wrapper>
    );
}

export default Layout;
