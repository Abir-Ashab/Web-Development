/* eslint-disable react/prop-types */
const Print = (props) => {
    let isShow = props.show; 
    return (
        <div>
            {
                isShow ? <p>He is my friend</p> : <p>I dont know him</p>
            }
        </div>
    );
};
export default Print;