import {useEffect, useState} from "react";
import {Form, Modal, Button} from "react-bootstrap";
import {Card, CustomButton, Wrapper} from "./styles";
import {addBondToPortfolioAPI, addStockToPortfolioAPI, getBondsAPI, getPortfolioAPI} from "../../api";
import {NotificationManager} from "react-notifications";

function Bonds() {
    const [show, setShow] = useState(false);
    const [bonds, setBonds] = useState([]);
    const [bondId, setBondId] = useState(null);
    const [bondName, setBondName] = useState('');
    const [portfolioId, setPortfolioId] = useState('');
    const [portfolios, setPortfolios] = useState([]);
    const [count, setCount] = useState('');
    useEffect(() => {
        getBonds();
        getPortfolios();
    }, []);

    const getBonds = () => {
        getBondsAPI()
            .then(res => {
                setBonds(res?.data?.data);
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }

    const getPortfolios = () => {
        getPortfolioAPI()
            .then(res => {
                setPortfolios(res?.data);
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }

    const handleClose = () => setShow(false);
    const handleAdd = (bondId, bondName) => {
        setShow(true)
        setCount('');
        setPortfolioId(null);
        setBondId(bondId);
        setBondName(bondName);
    };

    const onSave = async () => {
        try {
            await addBondToPortfolioAPI(count, bondId, portfolioId)
            handleClose();
            NotificationManager.success('Облигация успешно добавлена в портфель');
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const getMarkColor = (price) => {
        if (price < 100) {
            return 'rgba(0,255,0,0.7)';
        }
        if (price > 100) {
            return 'rgba(255,165,0,0.7)';
        }
        if (price > 150) {
            return 'rgba(255,0,0,0.7)';
        }

        return '#D3D3D3';
    }
    return (
        <Wrapper>
            {bonds.map(({bondname, bonddesc, price, id}) => (
                <Card key={id} className="shadow bg-white rounded" colorMark={getMarkColor(price)}>
                    <Card.Body>
                        <Card.Title>{bondname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                        <Card.Text>
                            {bonddesc}
                        </Card.Text>
                        <CustomButton onClick={() => handleAdd(id, bondname)}>Добавить в портфель</CustomButton>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление {bondName} в портфель</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicCount">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            placeholder="Введите количество"
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPortfolio">
                        <Form.Label>Портфель</Form.Label>
                        <Form.Select
                            aria-label="Выберите портфель"
                            placeholder="Выберите портфель"
                            onChange={(e) => setPortfolioId(e.target.value)}
                        >
                            <option value={null} />
                            {portfolios?.map(({id, goal, years}) => (
                                <option key={id} value={id}>{`${goal} - ${years} лет`}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={onSave} disabled={!portfolioId || count <= 0}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    );
}

export default Bonds;
