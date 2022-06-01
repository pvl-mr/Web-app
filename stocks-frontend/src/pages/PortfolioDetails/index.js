import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { BsArrowLeft } from "react-icons/bs";
import {Form, Modal} from "react-bootstrap";
import {
    InfoBlock,
    Title,
    Wrapper,
    WrapperStocks,
    Card,
    WrapperBonds,
    Table,
    Cell,
    Head,
    Body,
    Tr,
    Bold, Back, Actions
} from "./styles";
import paths from "../../constants/paths";
import {
    deletePortfolioAPI,
    getPortfolioBondsDetailsAPI,
    getPortfolioDetailsAPI,
    getPortfolioStocksAPI, sendMessageAPI, sendPortfolioAPI, updatePortfolioAPI
} from "../../api";
import {numWord} from "../../helpers/numWord";
import {Button} from "../Portfolios/styles";
import {NotificationManager} from "react-notifications";

function PortfolioDetails() {
    const navigate = useNavigate();
    const [details, setDetails] = useState();
    const [bonds, setBonds] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [show, setShow] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [goal, setGoal] = useState('');
    const [month, setMonth] = useState('');
    const [analyses, setAnalyses] = useState('');
    const { id } = useParams();
    const isAnalyst = localStorage.getItem('status') === 'analyst';

    useEffect(() => {
        getDetails()
    }, [id]);

    const getDetails = async () => {
        try {
            const { data: portfolio } = await getPortfolioDetailsAPI(id);
            setDetails(portfolio.data);
            const { data: stocks } = await getPortfolioStocksAPI(id);
            setStocks(stocks.data);
            const { data: bonds } = await getPortfolioBondsDetailsAPI(id);
            setBonds(bonds.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleClose = () => setShow(false);

    const handleCloseAnalysis = () => setShowAnalysis(false);

    const handleUpdate = (data) => {
        setShow(true)
        setDataUpdate(data);
        setGoal(data.goal)
        setMonth(data.years)
    };

    const deletePortfolio = async (id) => {
        try {
            await deletePortfolioAPI(id)
            goBack();
            NotificationManager.success('Портфель успешно удален');
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const onSubmitPortfolio = async () => {
        try {
            await updatePortfolioAPI(dataUpdate.id, month, goal, dataUpdate.analyst_id);
            const { data: portfolio } = await getPortfolioDetailsAPI(id);
            setDetails(portfolio.data);
            NotificationManager.success('Портфель успешно изменен');
            handleClose();
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const sendMessage = async () => {
        try {
            await sendMessageAPI(analyses, id);
            const { data: portfolio } = await getPortfolioDetailsAPI(id);
            setDetails(portfolio.data);
            NotificationManager.success('Анализ портфеля успешно сохранен');
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const onAddAnalyses = async () => {
        try {
            sendMessage();
            handleCloseAnalysis();
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const sendPortfolio = async () => {
        try {
            await sendPortfolioAPI(id)
            const { data: portfolio } = await getPortfolioDetailsAPI(id);
            setDetails(portfolio.data);
            NotificationManager.success('Портфель успешно отправлен на анализ');
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const handleAddAnalyses = () => {
        setShowAnalysis(true)
        setAnalyses(details?.message)
    };

    const goBack = () => navigate(isAnalyst ? paths.ANALYST_PORTFOLIO : paths.PORTFOLIO)

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
            <Back onClick={goBack}><BsArrowLeft />Назад</Back>
            <Table>
                <Head>
                    <Tr>
                        <Cell>
                            ID
                        </Cell>
                        <Cell>
                            Цель
                        </Cell>
                        <Cell>
                            Срок в месяцах
                        </Cell>
                    </Tr>
                </Head>
                <Body>
                    <Tr>
                        <Cell>
                            {id}
                        </Cell>
                        <Cell>
                            {details?.goal}
                        </Cell>
                        <Cell>
                            {details?.years} {numWord(Number(details?.years), ['месяц', 'месяца', 'месяцев'])}
                        </Cell>
                    </Tr>
                </Body>
            </Table>
            {isAnalyst ? (
                <Actions>
                    <Button onClick={handleAddAnalyses}>{details?.message ? 'Изменить анализ' : 'Добавить анализ'}</Button>
                </Actions>
            ) : (
                <Actions>
                    <Button onClick={() => handleUpdate(details)}>Изменить</Button>
                    {!details?.sendstatus && <Button variant="success" onClick={sendPortfolio}>Отправить на анализ</Button>}
                    <Button variant="outline-danger" onClick={() => deletePortfolio(details?.id)}>Удалить</Button>
                </Actions>
            )}
            {details?.message && <InfoBlock><Bold>Результаты анализа:</Bold> {details?.message}</InfoBlock>}

            <Title>Акции</Title>
            <WrapperStocks>
                {stocks.map(({stockname, stockdesc, price, id}) => (
                    <Card key={id} className="shadow bg-white rounded" colorMark={getMarkColor(price)}>
                        <Card.Body>
                            <Card.Title>{stockname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                            <Card.Text>
                                {stockdesc}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </WrapperStocks>
            <Title>Облигации</Title>
            <WrapperBonds>
                {bonds.map(({bondname, bonddesc, price, id}) => (
                    <Card key={id} className="shadow bg-white rounded" colorMark={getMarkColor(price)}>
                        <Card.Body>
                            <Card.Title>{bondname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
                            <Card.Text>
                                {bonddesc}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </WrapperBonds>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение портфеля</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicGoal">
                        <Form.Label>Цель</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите цель"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDeadline">
                        <Form.Label>Срок в месяцах</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Введите срок в месяцах"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={onSubmitPortfolio} disabled={!goal || !month}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAnalysis} onHide={handleCloseAnalysis}>
                <Modal.Header closeButton>
                    <Modal.Title>Описание анализа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicGoal">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={8}
                            type="text"
                            placeholder="Введите описание"
                            value={analyses}
                            onChange={(e) => setAnalyses(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onAddAnalyses} disabled={!analyses}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    );
}

export default PortfolioDetails;
