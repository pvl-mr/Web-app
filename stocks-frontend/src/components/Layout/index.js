import { useLocation } from "react-router-dom";
import {Navbar, Container, Nav} from "react-bootstrap";

import {BlockCurrency, Content, Currency, FooterWrapper, HeaderWrapper, NavLink, Wrapper} from "./styles";
import paths from "../../constants/paths";
import {useEffect, useState} from "react";
import axios from "axios";

function Layout({children}) {
    const [currencyUSD, setCurrencyUSD] = useState(null);
    const [currencyEUR, setCurrencyEUR] = useState(null);
    const { pathname } = useLocation();
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
                        <BlockCurrency>
                            <Currency>USD/RUB: {currencyUSD}</Currency>
                            <Currency>EUR/RUB: {currencyEUR}</Currency>
                        </BlockCurrency>
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
