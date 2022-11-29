import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getProductDetail } from "../../redux/actions";
import s from '../ProductDetail/Product.module.css';

const CreateComment = () => {

    const product = useSelector((state) => state.productDetail);

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
    const comments = useSelector((state) => state.productComments);
    const productComments = comments.filter((c) => {
        return c.products[0].name === product.name;
    });
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
        setComment({...comment, comment: ""})
        dispatch(getProductDetail(idProduct))
    }

    const dispatch = useDispatch();
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
            {productComments.length ? (
                <div>
                    Comments:{' '}
                    {productComments.map((c) => {
                        return (
                            <div key={c.id}>
                                <p className={s.parafo}>{c.comment}</p>
                                <p className={s.parafo}>Rating: {c.rating}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className={s.parafo}>Without comentaries</p>
            )}
        </div>
    )

}

export default CreateComment