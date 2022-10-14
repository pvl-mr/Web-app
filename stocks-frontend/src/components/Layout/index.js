import {useLocation, useNavigate} from "react-router-dom";
import {Navbar, Container, Nav, Offcanvas} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

import {BlockCurrency, Content, Currency, FooterWrapper, HeaderWrapper, NavLink, Wrapper} from "./styles";
import paths from "../../constants/paths";

function Layout({children}) {
    const [currencyUSD, setCurrencyUSD] = useState(null);
    const [currencyEUR, setCurrencyEUR] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const { pathname } = useLocation();
    let navigate = useNavigate();
    const status = localStorage.getItem('status');
    useEffect(() => {
        fetchData('USD');
        fetchData('EUR');
    }, []);
    const fetchData = async (currency) => {
        try {
            const data = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
            const rates = data.data.rates;
            if (currency === 'USD') {
                setCurrencyUSD(rates['RUB'])
            } else {
                setCurrencyEUR(rates['RUB'])
            }
        } catch (e) {
            console.log(e);
        }
    };

    const navigatePage = (pathname) => {
        setExpanded(false);
        navigate(pathname);
    }

    const expand = 'md';
    return (
        <Wrapper>
            <HeaderWrapper>
                <Navbar expanded={expanded} key={expand} bg="dark" expand={expand} variant="dark">
                    <Container fluid>
                        <Navbar.Brand href={paths.MAIN}>INVESTMENT</Navbar.Brand>
                        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton onClick={() => setExpanded(!expanded)}>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    INVESTMENT
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {status === 'analyst' ? (
                                        <>
                                            <Nav.Link onClick={() => navigatePage(paths.ANALYST_PORTFOLIO)} isActive={pathname === paths.ANALYST_PORTFOLIO}>Портфели</Nav.Link>
                                            <Nav.Link onClick={() => navigatePage(paths.PROFILE)} isActive={pathname === paths.PROFILE}>Профиль</Nav.Link>
                                        </>
                                    ) : (
                                        <>
                                            <Nav.Link onClick={() => navigatePage(paths.PORTFOLIO)} isActive={pathname === paths.PORTFOLIO}>Портфели</Nav.Link>
                                            <Nav.Link onClick={() => navigatePage(paths.STOCKS)} isActive={pathname === paths.STOCKS}>Акции</Nav.Link>
                                            <Nav.Link onClick={() => navigatePage(paths.BONDS)} isActive={pathname === paths.BONDS}>Облигации</Nav.Link>
                                            <Nav.Link onClick={() => navigatePage(paths.PROFILE)} isActive={pathname === paths.PROFILE}>Профиль</Nav.Link>
                                        </>
                                    )}
                                </Nav>
                                <BlockCurrency>
                                    <Currency>USD/RUB: {currencyUSD}</Currency>
                                    <Currency>EUR/RUB: {currencyEUR}</Currency>
                                </BlockCurrency>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
                {/*<Navbar bg="dark" variant="dark">*/}
                {/*    <Container fluid>*/}
                {/*        <Navbar.Brand href={paths.MAIN}>INVESTMENT</Navbar.Brand>*/}

                {/*        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />*/}
                {/*        <Navbar.Offcanvas*/}
                {/*            id={`offcanvasNavbar-expand-${expand}`}*/}
                {/*            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}*/}
                {/*            placement="end"*/}
                {/*        >*/}
                {/*            <Offcanvas.Header closeButton>*/}
                {/*                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>*/}
                {/*                    INVESTMENT*/}
                {/*                </Offcanvas.Title>*/}
                {/*            </Offcanvas.Header>*/}
                {/*            <Offcanvas.Body>*/}
                {/*                <Nav className="justify-content-end flex-grow-1 pe-3">*/}
                {/*                    {status === 'analyst' ? (*/}
                {/*                        <>*/}
                {/*                            <NavLink to={paths.ANALYST_PORTFOLIO} isActive={pathname === paths.ANALYST_PORTFOLIO}>Портфели</NavLink>*/}
                {/*                            <NavLink to={paths.PROFILE} isActive={pathname === paths.PROFILE}>Профиль</NavLink>*/}
                {/*                        </>*/}
                {/*                    ) : (*/}
                {/*                        <>*/}
                {/*                            <NavLink to={paths.PORTFOLIO} isActive={pathname === paths.PORTFOLIO}>Портфели</NavLink>*/}
                {/*                            <NavLink to={paths.STOCKS} isActive={pathname === paths.STOCKS}>Акции</NavLink>*/}
                {/*                            <NavLink to={paths.BONDS} isActive={pathname === paths.BONDS}>Облигации</NavLink>*/}
                {/*                            <NavLink to={paths.PROFILE} isActive={pathname === paths.PROFILE}>Профиль</NavLink>*/}
                {/*                        </>*/}
                {/*                    )}*/}
                {/*                </Nav>*/}
                {/*            </Offcanvas.Body>*/}
                {/*        </Navbar.Offcanvas>*/}
                {/*        /!*<Nav className="me-auto">*!/*/}
                {/*        /!*    {status === 'analyst' ? (*!/*/}
                {/*        /!*        <>*!/*/}
                {/*        /!*            <NavLink to={paths.ANALYST_PORTFOLIO} isActive={pathname === paths.ANALYST_PORTFOLIO}>Портфели</NavLink>*!/*/}
                {/*        /!*            <NavLink to={paths.PROFILE} isActive={pathname === paths.PROFILE}>Профиль</NavLink>*!/*/}
                {/*        /!*        </>*!/*/}
                {/*        /!*    ) : (*!/*/}
                {/*        /!*        <>*!/*/}
                {/*        /!*            <NavLink to={paths.PORTFOLIO} isActive={pathname === paths.PORTFOLIO}>Портфели</NavLink>*!/*/}
                {/*        /!*            <NavLink to={paths.STOCKS} isActive={pathname === paths.STOCKS}>Акции</NavLink>*!/*/}
                {/*        /!*            <NavLink to={paths.BONDS} isActive={pathname === paths.BONDS}>Облигации</NavLink>*!/*/}
                {/*        /!*            <NavLink to={paths.PROFILE} isActive={pathname === paths.PROFILE}>Профиль</NavLink>*!/*/}
                {/*        /!*        </>*!/*/}
                {/*        /!*    )}*!/*/}
                {/*        /!*</Nav>*!/*/}
                {/*        <BlockCurrency>*/}
                {/*            <Currency>USD/RUB: {currencyUSD}</Currency>*/}
                {/*            <Currency>EUR/RUB: {currencyEUR}</Currency>*/}
                {/*        </BlockCurrency>*/}
                {/*    </Container>*/}
                {/*</Navbar>*/}
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
