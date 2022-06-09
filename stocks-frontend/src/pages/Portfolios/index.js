import {useEffect, useState} from "react";
import {Form, Modal} from 'react-bootstrap';

import {
    Button,
    Wrapper,
    WrapperActions,
    Card,
    Actions,
    BlockActions,
    EmptyButton,
    DescriptionStatus,
    Status
} from "./styles";
import {createPortfolioAPI, deletePortfolioAPI, getPortfolioAPI, sendPortfolioAPI, updatePortfolioAPI} from "../../api";
import {numWord} from "../../helpers/numWord";
import {useNavigate, generatePath} from "react-router-dom";
import paths from "../../constants/paths";
import {NotificationManager} from "react-notifications";
import {NoData} from "../PortfoliosAnalyst/styles";

function Portfolios() {
    const [portfolios, setPortfolios] = useState([]);
    const [show, setShow] = useState(false);
    const [showAnalyses, setShowAnalyses] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [goal, setGoal] = useState('');
    const [month, setMonth] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        getPortfolio();
    }, [])

    const handleClose = () => setShow(false);
    const handleCloseAnalyses = () => setShowAnalyses(false);
    const handleAdd = () => {
        setShow(true)
        setDataUpdate(null);
        setGoal('')
        setMonth('')
    };

    const handleUpdate = (data) => {
        setShow(true)
        setDataUpdate(data);
        setGoal(data.goal)
        setMonth(data.years)
    };

    const onSubmitPortfolio = async () => {
        try {
            if (!!dataUpdate) {
                await updatePortfolioAPI(dataUpdate.id, month, goal, dataUpdate.analyst_id);
                NotificationManager.success('Портфель успешно изменен');
            } else {
                await createPortfolioAPI(month, goal);
                NotificationManager.success('Портфель успешно создан');
            }

            getPortfolio();
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

    const deletePortfolio = async (id) => {
        try {
            await deletePortfolioAPI(id)
            getPortfolio();
            NotificationManager.success('Портфель успешно удален');
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const sendPortfolio = async (id) => {
        try {
            await sendPortfolioAPI(id)
            getPortfolio();
            NotificationManager.success('Портфель успешно отправлен на анализ');
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const checkResult = async (message) => {
        setShowAnalyses(true);
        setMessage(message);
    }

    const showDetails = (portfolioId) => {
        const path = generatePath(paths.PORTFOLIO_DETAILS, {
            id: portfolioId,
        })
        navigate(path);
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

    return (
        <Wrapper>
            {!loading && portfolios?.length === 0 ? (
                <WrapperActions className='shadow bg-white rounded'>
                    <Button variant="outline-primary" onClick={handleAdd}>Добавить</Button>
                    <Button variant="outline-success">Отчёт</Button>
                </WrapperActions>
            ) : (
                <>
                    <DescriptionStatus>
                        <Status color={'rgba(255,0,0,0.7)'} />
                        не отправлено
                        <Status color={'rgba(255,165,0,0.7)'} />
                        отправлено
                        <Status color={'rgba(0,255,0,0.7)'} />
                        анализ получен
                    </DescriptionStatus>
                    {portfolios?.map((portfolio) => (
                        <Card key={portfolio.id} className="shadow bg-white rounded" colorMark={getMarkColor(portfolio.sendstatus, portfolio.message)}>
                            <Card.Body>
                                <Card.Title>{portfolio.goal}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Срок: {portfolio.years} {numWord(Number(portfolio.years), ['месяц', 'месяца', 'месяцев'])}</Card.Subtitle>
                                <BlockActions>
                                    <Actions>
                                        <Button variant="outline-danger" onClick={() => deletePortfolio(portfolio.id)}>Удалить</Button>
                                        <Button onClick={() => handleUpdate(portfolio)}>Изменить</Button>
                                        <EmptyButton onClick={() => showDetails(portfolio.id)}>Подробнее</EmptyButton>
                                    </Actions>
                                    {!portfolio.sendstatus && (
                                        <EmptyButton onClick={() => sendPortfolio(portfolio.id)}>Отправить на анализ</EmptyButton>
                                    )}
                                    {portfolio.sendstatus === 'send' && !!portfolio.message && (
                                        <EmptyButton onClick={() => checkResult(portfolio.message)}>Просмотреть результат анализа</EmptyButton>
                                    )}
                                </BlockActions>
                            </Card.Body>
                        </Card>
                    ))}
                </>
            )}
            <WrapperActions className='shadow bg-white rounded'>
                <Button variant="outline-primary" onClick={handleAdd}>Добавить</Button>
                <Button variant="outline-success">Отчёт</Button>
            </WrapperActions>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{dataUpdate ? 'Изменение портфеля' : 'Добавление портфеля'}</Modal.Title>
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
                        {dataUpdate ? 'Сохранить' : 'Добавить'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAnalyses} onHide={handleCloseAnalyses}>
                <Modal.Header closeButton>
                    <Modal.Title>Анализ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {message}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAnalyses}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    );
}

export default Portfolios;
