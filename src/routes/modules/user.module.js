const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:userId', (req, res) => {
    if (req.params.userId) {
        fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json(
                    {
                        message: 'Get data failed !'
                    }
                )
            }

   
        
            let usersData = JSON.parse(data);
            console.log('usersData',usersData);

            for (let i in postsData) {
                const post = usersData.find(post => post.id == req.params.userId)
                fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersData), (err) => {
                    if (err) {
                        return res.status(500).json(
                            {
                                message: 'Save data failed !'
                            }
                        )
                    }
                    return res.status(200).json(
                        {
                            data: user
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
    fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "failed",
            });
        }
        if (req.query.id) {
            let user = JSON.parse(data).find(user => user.id == req.query.id);
            if (user) {
                return res.status(200).json({
                    data: user
                });
            }
        }
        return res.status(200).json({
            message: "success",
            data: JSON.parse(data)
        });
    });
});
router.delete('/:userId', (req, res) => {
    if (req.params.userId) {
        fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lấy post thất bại!"
                })
            }
            let hocs = JSON.parse(data);
            hocs = hocs.filter(hoc => hoc.id != req.params.userId);

            fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(hocs), (err) => {
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
                message: "Vui lòng truyền userId!"
            }
        )
    }
})

router.post('/', (req, res) => {
    fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Đọc dữ liệu thất bại!"
            });
        }
        
        let oldData = JSON.parse(data);
        let newUser = {  
            id: Date.now(),
            ...req.body
        };

        oldData.unshift(newUser);

        fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(oldData), (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Ghi file thất bại!"
                });
            }
            return res.status(200).json({
                message: "Thêm user thành công!",
                data: newUser
            });
        });
    });
});
router.put('/:usersId', (req, res) => {
    if (!req.params.usersId) {
        return res.status(500).json({
            message: "Please transmit usersId you want to update"
        })
    }
    let usersId = req.params.usersId;
    let body = req.body;

    //Update the user
    fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Getting users failed"
            });
        }

        let users = JSON.parse(data);
        let user = users.find(user => user.id == usersId);
        if (!user) {
            return res.status(500).json({
                message: "Can't change user with id" + usersId
            });
        }
        //Update the user with the body data
        Object.assign(user, body);

        //Save the updated user
        fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users), (err) => {
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
