import green from '../../../Assets/Green.svg';
import amber from '../../../Assets/Amber.svg';
import red from '../../../Assets/Red.svg';
import Delete from '../../Page/Delete';
import { Button, Col, Row } from 'react-bootstrap';
import { socket } from '../../../socket';

const Responses = ({ lessonId, questionId, data }) => {

    const displayResponses = () => {
        // Sort responses to display Red-Amber-Green
        data?.responses.sort();

        const display = data?.responses.map((response, index) => {
            if (response === '3red')
                return <img alt='red square' key={index} className='bar' src={red} />;

            if (response === '2amber')
                return <img alt='amber square' key={index} className='bar' src={amber} />;

            if (response === '1green')
                return <img alt='green square' key={index} className='bar' src={green} />;

            return <div key='na'></div>
        });
        return display?.length > 0 ? display : <p className='text-muted'>No responses given.</p>;
    }

    const displayDate = () => {
        const date = new Date(data.date)

        return date.toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" });;
    }

    const deleteResponsesHandler = () => {
        socket.emit('delete_responses', { lessonId: lessonId, questionId: questionId, responsesId: data._id });
    }

    return (
        <>
            <Row>
                <Col className='d-flex flex-row flex-wrap'>
                    {displayResponses()}
                </Col>
                <Col sm='2'>
                    <span className='text-muted'>Asked at: </span>{displayDate()}
                </Col>
                <Col sm='1'>
                    <Delete lessonId={lessonId} questionId={questionId} responsesId={data._id} />
                </Col>
            </Row>
            <hr className='response-break' />
        </>
    )
}

export default Responses;