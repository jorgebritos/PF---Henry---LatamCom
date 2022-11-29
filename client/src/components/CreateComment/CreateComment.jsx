import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getAllComments } from "../../redux/actions";

const CreateComment = () => {

    const [comment, setComment] = useState({
        comment: "",
        rating: 1
    })

    function handleComment(e) {
        e.preventDefault();
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
        return comment;
    }

    function sendComment(e) {
        e.preventDefault();
        let idProduct = product.id;
        console.log(idProduct)
        if (!idProduct) return console.log("faltan datos")
        dispatch(createComment({
            ...comment,
            idUser: 1,
            idProduct
        }))
        dispatch(getAllComments())
    }

    const dispatch = useDispatch();
    const product = useSelector((state) => state.productDetail);
    // const user = useSelector((state) => state.user);

    return (
        <div>
            <div>
                <label>Rating:</label>
                <select name="rating" onChange={e => handleComment(e)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />

                <textarea cols={50} name="comment" rows={10} placeholder={"Please, write a comment"} value={comment.comment} onChange={e => handleComment(e)}></textarea>
                <button onClick={e => sendComment(e)}>Send Comment</button>
            </div>

        </div>
    )

}

export default CreateComment