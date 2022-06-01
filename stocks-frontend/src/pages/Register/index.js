import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {Actions, Content, CustomLink, Title, Wrapper} from "./styles";
import paths from "../../constants/paths";
import {RegisterAPI} from "../../api";
import {NotificationManager} from "react-notifications";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    let navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();
        try {
            await RegisterAPI(firstName, lastName, email, password, code);
            navigate(paths.LOGIN);
            NotificationManager.success('Аккаунт успешно создан');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Wrapper>
            <Content>
                <Title>Регистрация</Title>
                <Form onSubmit={onRegister}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя" onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastname">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text" placeholder="Введите фамилию" onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCodeAnalytic">
                        <Form.Label>Код аналитика</Form.Label>
                        <Form.Control type="text" placeholder="Введите код аналитика" onChange={(e) => setCode(e.target.value)} />
                    </Form.Group>
                    <Actions>
                        <Button variant="primary" type="submit" disabled={!firstName || !lastName || !email || !password }>
                            Зарегистрироваться
                        </Button>
                        <CustomLink to={paths.LOGIN}>
                            У меня уже есть аккаунт
                        </CustomLink>
                    </Actions>
                </Form>
            </Content>
        </Wrapper>
    );
}

export default Register;
