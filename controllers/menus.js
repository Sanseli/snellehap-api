const menusRouter = require('express').Router()
const Menu = require('../models/menu')
const { userExtractor } = require( '../utils/middleware' )

menusRouter.get('/', (request, response, next) => {
  Menu
    .find({})
    .then(menus => {
      response.json(menus)
    })
    .catch(error => next(error))
})

// menusRouter.post('/', userExtractor, (request, response, next) => {
//   const body = request.body

//   const menu = new Menu({
//     name: body.name,
//   })

//   menu
//     .save()
//     .then(result => {
//       request.user.save().then(() => {
//         response.status(201).json(result)
//       })
//     })
//     .catch(error => next(error))
// })

// menusRouter.put('/:id', async (request, response, next) => {
//   const body = request.body
//   const menu = {
//     title: body.title,
//     author: body.author,
//     likes: body.likes,
//     url: body.url
//   }

//   await Menu.findByIdAndUpdate(request.params.id, menu, { new: true })
//     .then(updatedMenu => {
//       response.json(updatedMenu)
//     })
//     .catch(error => next(error))
// })

// menusRouter.delete('/:id', userExtractor, async (request, response) => {
//   const menu = await Menu.findById(request.params.id)

//   console.log('menuuser',menu.user)
//   if (menu && menu.user.toString() === request.user.id.toString()) {
//     await Menu.findByIdAndRemove(request.params.id)
//   }
//   else return response.status(401).json({ error: 'wrong user' })
//   response.status(204).end()
// })

module.exports = menusRouter