import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    InfoBlock,
    Wrapper,
    Body,
    Tr,
    Bold, TableInfo, CellInfo, HeadInfo, WrapperChart, WrapperRisc, Description, BlockInfo, WrapperTable
} from "./styles";
import {getMathAnalysesAPI,
} from "../../../api";

ChartJS.register(ArcElement, Tooltip, Legend);

function MathAnalyses({stocks, bonds}) {
    const [mathAnalyses, setMathAnalyses] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        getMathAnalyses();
    }, [id]);

    const getMathAnalyses = async () => {
        try {
            const { data } = await getMathAnalysesAPI(id);
            setMathAnalyses(data.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const activesDistribution = {
        labels: ['Консервативная часть', 'Агрессивная часть'],
        datasets: [
            {
                label: 'Распределение активов',
                data: [mathAnalyses?.type?.stock_proportion * 100, mathAnalyses?.type?.bond_proportion * 100],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const bondsAndStocks = {
        labels: ['Акции, ед.', 'Облигации, ед.'],
        datasets: [
            {
                label: 'Акции/облигации',
                data: [stocks.length, bonds.length],
                backgroundColor: [
                    'rgba(10, 0, 132)',
                    'rgba(0, 255, 50)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const sumStocks = stocks.reduce((acc, curr) => acc + Number(curr.price) * curr.count, 0)
    const sumBonds = bonds.reduce((acc, curr) => acc + Number(curr.price) * curr.count, 0)


    const budget = {
        labels: ['Акции, $', 'Облигации, $'],
        datasets: [
            {
                label: 'Акции/облигации',
                data: [sumStocks, sumBonds],
                backgroundColor: [
                    'rgba(10, 0, 132)',
                    'rgba(0, 255, 50)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Wrapper>
            <InfoBlock>
                <Bold>Анализ на основе математической модели:</Bold>
            </InfoBlock>
            <WrapperTable>
                <TableInfo>
                    <HeadInfo>
                        <Tr>
                            <CellInfo>
                                Класс активов
                            </CellInfo>
                            <CellInfo color='#f5d142'>
                                Осторожный
                            </CellInfo>
                            <CellInfo color='#5da377'>
                                Консервативный
                            </CellInfo>
                            <CellInfo color='#5d86a3'>
                                Умеренный
                            </CellInfo>
                            <CellInfo color='#b5555f'>
                                Агрессивный
                            </CellInfo>
                        </Tr>
                    </HeadInfo>
                    <Body>
                        <Tr>
                            <CellInfo>
                                Консервативная часть: облигации
                            </CellInfo>
                            <CellInfo>
                                100%
                            </CellInfo>
                            <CellInfo>
                                До 85%
                            </CellInfo>
                            <CellInfo>
                                До 60%
                            </CellInfo>
                            <CellInfo>
                                До 40-50%
                            </CellInfo>
                        </Tr>
                        <Tr>
                            <CellInfo>
                                Рисковая часть: акции
                            </CellInfo>
                            <CellInfo>
                                0%
                            </CellInfo>
                            <CellInfo>
                                10-20%
                            </CellInfo>
                            <CellInfo>
                                До 30%
                            </CellInfo>
                            <CellInfo>
                                До 50-60%
                            </CellInfo>
                        </Tr>
                    </Body>
                </TableInfo>
            </WrapperTable>
            <WrapperRisc>
                {(stocks?.length || bonds?.length) && (
                    <WrapperChart>
                        <Pie data={bondsAndStocks} />
                    </WrapperChart>
                )}
                {(!!sumStocks || sumBonds) && (
                    <WrapperChart>
                        <Pie data={budget} />
                    </WrapperChart>
                )}
                {(mathAnalyses?.type?.stock_proportion || mathAnalyses?.type?.bond_proportion) && (
                    <WrapperChart>
                        <Pie data={activesDistribution} />
                    </WrapperChart>
                )}
            </WrapperRisc>
            <BlockInfo>
                <div>
                    <Bold>Риск-профилирование вашего портфеля: {mathAnalyses?.type?.type}</Bold>
                    <Description>
                        <p>Чтобы правильно распределить активы в своём портфеле. Отбирая инструменты в портфель, смотрите не только на потенциальную доходность, но и оценивайте риски.</p>
                        <p>Мы оценили риск-проифилирование Вашего портфеля на основе данных портфеля.</p>
                        <p>Расшифровка:</p>
                        <p>Консервативный. Цель инвестора — сохранить капитал и защитить его от инфляции. Инвестор готов получать доход на уровне ставки по вкладам. Он не склонен рисковать, поэтому большую часть денег, примерно 70-75%, инвестирует в облигации высоконадёжных эмитентов (государства и корпораций) и держит на банковском счете. Остальное инвестирует в акции наиболее крупных и ликвидных компаний: «голубых фишек» и ETF. В случае с акциями получает доход в виде дивидендов.</p>
                        <p>Агрессивный. Приоритет такого инвестора — максимальная доходность. Он готов инвестировать в высокорисковые инструменты: акции новых технологичных компаний, ценные бумаги развивающихся рынков, IPO. Может работать на срочном рынке и торговать с плечом — некоторые брокеры таких инвесторов называют «профессиональными» или трейдерами. Как правило, в инструменты фондового рынка они инвестирует около 80% капитала.</p>
                    </Description>
                </div>
                <div>
                    <Bold>Годовая реализованная доходность портфеля: {mathAnalyses?.overall_return}%</Bold>
                    <Description>Если срок инвестиций составляет несколько лет, инвестору важно понимать значение среднегодовой доходности своих инвестиций. Инвестор может сравнить какие варианты активов наиболее эффективны для его целей — вложения в акции или другие финансовые инструменты, например, облигации или депозиты.</Description>
                </div>
                <div>
                    <Bold>Ожидаемая доходность портфеля : {mathAnalyses?.expected_return}%</Bold>
                    <Description>Под ожидаемой доходностью портфеля понимается средневзвешенное значение ожидаемых значений доходности ценных бумаг, входящих в портфель. При этом «вес» каждой ценной бумаги определяется относительным количеством денег, направленных инвестором на покупку этой ценной бумаги. </Description>
                </div>
                <div>
                    <Bold>Ожидаемый риск порфтеля: {mathAnalyses?.standard_deviation}%</Bold>
                    <Description>Все участники фондового рынка действуют в условиях неполной определенности. Соответственно, исход практически любых операций купли-продажи ценных бумаг не может быть точно предсказан, то есть сделки подвержены риску. В общем случае под риском подразумевают вероятность наступления какого-либо события. Оценить риск — это значит оценить вероятность наступления события. Риск портфеля объясняется не только индивидуальным риском каждой отдельно взятой ценной бумаги портфеля, но и тем, что существует риск воздействия изменений наблюдаемых ежегодных величин доходности одной акции на изменение доходности других акций, включаемых в инвестиционный портфель.</Description>
                </div>
            </BlockInfo>
        </Wrapper>
    );
}

export default MathAnalyses;
