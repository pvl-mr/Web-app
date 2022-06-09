import {useEffect, useState} from "react";
import {Form, Modal, Button} from "react-bootstrap";
import {Card, CustomButton, Wrapper} from "./styles";
import {addStockToPortfolioAPI, getPortfolioAPI, getStocksAPI} from "../../api";
import {NotificationManager} from "react-notifications";

function Stocks() {
    const [show, setShow] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [stockId, setStockId] = useState(null);
    const [stockName, setStockName] = useState('');
    const [portfolioId, setPortfolioId] = useState('');
    const [portfolios, setPortfolios] = useState([]);
    const [count, setCount] = useState('');
    useEffect(() => {
        getStocks();
        getPortfolios();
    }, []);

    const getStocks = () => {
        getStocksAPI()
            .then(res => {
                setStocks(res?.data?.data);
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }

    const getPortfolios = () => {
        getPortfolioAPI()
            .then(res => {
                console.log('res', res);
                setPortfolios(res?.data);
            })
            .catch(err => {
                console.log('error: ', err);
            })
    }

    const handleClose = () => setShow(false);
    const handleAdd = (stockId, stockName) => {
        setShow(true)
        setCount('');
        setPortfolioId(null);
        setStockId(stockId);
        setStockName(stockName);
    };

    const onSave = async () => {
        try {
            await addStockToPortfolioAPI(count, stockId, portfolioId)
            handleClose();
            NotificationManager.success('Акция успешно добавлена в портфель');
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
            {stocks.map(({stockname, stockdesc, price, id}) => (
                <Card key={id} className="shadow bg-white rounded" colorMark={getMarkColor(price)}>
                    <Card.Body>
                        <Card.Title>{stockname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                        <Card.Text>
                            {stockdesc}
                        </Card.Text>
                        <CustomButton onClick={() => handleAdd(id, stockname)}>Добавить в портфель</CustomButton>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление {stockName} в портфель</Modal.Title>
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

export default Stocks;
