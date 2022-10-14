import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Form} from "react-bootstrap";

import {Actions, Content, CustomLink, StyledButtonLogin, Title, Wrapper} from "./styles";
import paths from "../../constants/paths";
import {LoginAPI} from "../../api";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await LoginAPI(email, password);
            const { user_id, status, token } = res?.data;
            if (user_id != null) {
                localStorage.setItem('userId', user_id);
                localStorage.setItem('status', status);
                localStorage.setItem('userData', JSON.stringify(res?.data?.user));
                localStorage.setItem('token', token);
                window.location.href = paths.MAIN;
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Wrapper>
            <Content>
                <Title>Авторизация</Title>
                <Form onSubmit={onLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Actions>
                        <StyledButtonLogin variant="primary" type="submit" disabled={!email || !password || password?.length < 5}>
                            Войти
                        </StyledButtonLogin>
                        <CustomLink to={paths.REGISTER}>
                            У меня нет аккаунта
                        </CustomLink>
                    </Actions>
                </Form>
            </Content>
        </Wrapper>
    );
}

export default Login;
