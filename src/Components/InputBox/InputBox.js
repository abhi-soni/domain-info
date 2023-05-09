import './InputBox.css';

const InputBox = () => {
    return (
        <div className="input-box">
            <div className="container">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter your task here" />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
            </div>
        </div>
    );
}
export default InputBox;