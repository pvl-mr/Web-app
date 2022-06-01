import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {BlockImg, CustomButton, NameInfo, Wrapper} from "./styles";
import paths from "../../constants/paths";

const profileIcon = 'https://st4.depositphotos.com/4329009/19956/v/950/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg?forcejpeg=true';

function Profile() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate(paths.LOGIN)
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
        <Wrapper>
            <Card style={{ width: '500px' }}>
                <BlockImg>
                    <Card.Img style={{ width: '200px', height: '200px' }} variant="top" src={profileIcon} />
                </BlockImg>
                <Card.Body>
                    <Card.Title>Профиль</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem className="d-flex">
                        <NameInfo>Имя:</NameInfo>
                        {userData.firstname}
                    </ListGroupItem>
                    <ListGroupItem className="d-flex">
                        <NameInfo>Фамилия:</NameInfo>
                        {userData.lastname}
                    </ListGroupItem>
                    <ListGroupItem className="d-flex">
                        <NameInfo>Email:</NameInfo>
                        {userData.email}
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <CustomButton onClick={logout}>Выйти</CustomButton>
                </Card.Body>
            </Card>
        </Wrapper>
    );
}

export default Profile;
