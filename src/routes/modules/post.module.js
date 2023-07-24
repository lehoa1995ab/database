const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:postId', (req, res) => {
    if (req.params.postId) {
        fs.readFile(path.join(__dirname, 'posts.json'), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json(
                    {
                        message: 'Get data failed !'
                    }
                )
            }

   
        
            let postsData = JSON.parse(data);
            console.log('postsData',postsData);

            for (let i in postsData) {
                const post = postsData.find(post => post.id == req.params.postId)
                fs.writeFile(path.join(__dirname, 'posts.json'), JSON.stringify(postsData), (err) => {
                    if (err) {
                        return res.status(500).json(
                            {
                                message: 'Save data failed !'
                            }
                        )
                    }
                    return res.status(200).json(
                        {
                            data: post
                        }
                    )
                })
            }

        })

    } else {
        res.status(500).json(
            {
                message: 'Failed!!!',
            }
        )
    }

})
router.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "posts.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "failed",
            });
        }
        if (req.query.id) {
            let post = JSON.parse(data).find(post => post.id == req.query.id);
            if (post) {
                return res.status(200).json({
                    data: post
                });
            }
        }
        return res.status(200).json({
            message: "success",
            data: JSON.parse(data)
        });
    });
});
router.delete('/:postId', (req, res) => {
    if (req.params.postId) {
        fs.readFile(path.join(__dirname, "posts.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lấy post thất bại!"
                })
            }
            let hocs = JSON.parse(data);
            hocs = hocs.filter(hoc => hoc.id != req.params.postId);

            fs.writeFile(path.join(__dirname, "posts.json"), JSON.stringify(hocs), (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lưu file thất bại!"
                    })
                }
                return res.status(200).json({
                    message: "Xóa post thành công!"
                })
            })
        })
    } else {
        return res.status(500).json(
            {
                message: "Vui lòng truyền postId!"
            }
        )
    }
})

router.post('/', (req, res) => {
    fs.readFile(path.join(__dirname, "posts.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Đọc dữ liệu thất bại!"
            });
        }
        
        let oldData = JSON.parse(data);
        let newPost = {  
            id: Date.now(),
            ...req.body
        };

        oldData.unshift(newPost);

        fs.writeFile(path.join(__dirname, "posts.json"), JSON.stringify(oldData), (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Ghi file thất bại!"
                });
            }
            return res.status(200).json({
                message: "Thêm post thành công!",
                data: newPost
            });
        });
    });
});

router.put('/:postId', (req, res) => {
    if (!req.params.postId) {
        return res.status(500).json({
            message: "Please transmit usersId you want to update"
        })
    }
    let postId = req.params.postId;
    let body = req.body;

    //Update the user
    fs.readFile(path.join(__dirname, "posts.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Getting users failed"
            });
        }

        let posts = JSON.parse(data);
        let post = posts.find(user => user.id == postId);
        if (!post) {
            return res.status(500).json({
                message: "Can't change user with id" + postId
            });
        }
        //Update the user with the body data
        Object.assign(post, body);

        //Save the updated user
        fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(posts), (err) => {
            if (err) {
                return res.status(500).json({
                    message: "File save failed!!"
                });
            }
            res.sendStatus(200);
        })
    })
})


module.exports = router;