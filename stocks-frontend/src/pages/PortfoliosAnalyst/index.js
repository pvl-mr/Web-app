import {useEffect, useState} from "react";
import {Form, Modal} from 'react-bootstrap';

import {
    Button,
    Wrapper,
    Card,
    Actions,
    BlockActions,
    EmptyButton,
    NoData
} from "./styles";
import {
    getPortfolioAnalystAPI,
    getPortfolioAPI, sendMessageAPI,
} from "../../api";
import {numWord} from "../../helpers/numWord";
import {generatePath, useNavigate} from "react-router-dom";
import paths from "../../constants/paths";
import {NotificationManager} from "react-notifications";

function PortfoliosAnalyst() {
    const [portfolios, setPortfolios] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [analyses, setAnalyses] = useState('');
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
    const isAnalyst = localStorage.getItem('status') === 'analyst';
    let navigate = useNavigate();

    useEffect(() => {
        if (isAnalyst) {
            getPortfolioAnalyst();
        } else {
            getPortfolio();
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleAddAnalyses = (portfolioId, analyses) => {
        setShow(true)
        setAnalyses(analyses)
        setSelectedPortfolioId(portfolioId)
    };

    const onAddAnalyses = async () => {
        try {
            sendMessage();
            getPortfolioAnalyst();
            handleClose();
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const getPortfolio = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioAPI();
            setPortfolios(data?.data);
        } catch (err) {
            console.log('error: ', err);
        } finally {
            setLoading(false);
        }
    }

    const getPortfolioAnalyst = async () => {
        setLoading(true);
        try {
            const data = await getPortfolioAnalystAPI();
            setPortfolios(data?.data?.data);
        } catch (err) {
            console.log('error: ', err);
        } finally {
            setLoading(false);
        }
    }

    const sendMessage = async () => {
        setLoading(true);
        try {
            await sendMessageAPI(analyses, selectedPortfolioId);
            getPortfolioAnalyst();
            NotificationManager.success('Анализ портфеля успешно сохранен');
        } catch (err) {
            console.log('error: ', err);
        } finally {
            setLoading(false);
        }
    }

    const getMarkColor = (sendstatus, message) => {
        if (!sendstatus) {
            return 'rgba(255,0,0,0.7)';
        }
        if (sendstatus && !message) {
            return 'rgba(255,165,0,0.7)';
        }
        if (sendstatus && message) {
            return 'rgba(0,255,0,0.7)';
        }

        return '#D3D3D3';
    }

    const showDetails = (portfolioId) => {
        const path = generatePath(paths.PORTFOLIO_DETAILS, {
            id: portfolioId,
        })
        navigate(path);
    }

    if (!loading && portfolios?.length === 0) {
        return (
            <Wrapper>
                <NoData>Нет данных</NoData>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {portfolios.map((portfolio) => (
                <Card key={portfolio.id} className="shadow bg-white rounded" colorMark={getMarkColor(portfolio.sendstatus, portfolio.message)}>
                    <Card.Body>
                        <Card.Title>{portfolio.goal}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Срок: {portfolio.years} {numWord(Number(portfolio.years), ['месяц', 'месяца', 'месяцев'])}</Card.Subtitle>
                        <BlockActions>
                            <Actions>
                                <Button onClick={() => handleAddAnalyses(portfolio.id, portfolio.message)} variant="outline-success">{portfolio.message ? 'Изменить анализ' : 'Добавить анализ'}</Button>
                                <EmptyButton onClick={() => showDetails(portfolio.id)}>Подробнее</EmptyButton>
                            </Actions>
                        </BlockActions>
                    </Card.Body>
                </Card>
            ))}

            <Modal show={show} onHide={handleClose}>
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

export default PortfoliosAnalyst;
