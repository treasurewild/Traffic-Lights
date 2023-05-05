import green from '../../../Assets/Green.svg';
import amber from '../../../Assets/Amber.svg';
import red from '../../../Assets/Red.svg';

const Responses = ({ responses }) => {

    const displayResponses = () => {
        // Sort responses to display Red-Amber-Green
        responses?.sort();

        const display = responses?.map((response, index) => {
            if (response === '3red')
                return <img alt='red square' key={index} className='bar' src={red} />;

            if (response === '2amber')
                return <img alt='amber square' key={index} className='bar' src={amber} />;

            if (response === '1green')
                return <img alt='green square' key={index} className='bar' src={green} />;

            return <div key='na'></div>
        });
        return display?.length > 0 ? display : <p className='text-muted'>No responses yet.</p>;
    }

    return (
        <div className='d-flex flex-row flex-wrap'>
            {displayResponses()}
        </div>
    )
}

export default Responses;