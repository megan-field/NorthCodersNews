process.env.NODE_ENV = 'test'

const { expect } = require('chai')
const mongoose = require('mongoose')
const app = require('../app')
const request = require('supertest')(app)
const seed = require('../seed/test.seed.js')

describe('Error Handling', function () {
  let docs
  this.timeout(8000)
  before(function () {
    return mongoose.connection.dropDatabase()
      .then(seed)
      .then(usefulDocs => {
        docs = usefulDocs
      })
  })

  after('', () => {
    mongoose.disconnect()
  })
  describe('Error Handling on all routes', () => {
    it('Handles the error on /*', () => {
      return request
        .get('/notWorking!')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Sorry that page could not be found')
        })
    })
    it('Handles the error on /api/*', () => {
      return request
        .get('/api/notAroute')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Sorry that page could not be found')
        })
    })
    it('Handles the error on /api/articles/*', () => {
      return request
        .get('/api/articles/notAroute')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Not a Valid ID')
        })
    })
    it('Handles the error on /api/articles?:page when there are no more articles', () => {
      return request
        .get('/api/articles?page=3')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('No More Articles')
        })
    })
    it('Handles the error on /api/articles/:article_id when the id is wrong/mispelt', () => {
      return request
        .get('/api/articles/5a7aef38c99a78119acc6f1a')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Not a Valid ID')
        })
    })
    it('Handles the error on /api/articles/:article_id/comments when the id is wrong/mispelt', () => {
      return request
        .get('/api/articles/5a7aef38c99a78119acc6f1a/comments?page=1')
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Not a Valid ID/No More Comments')
        })
    })
    it('Handles the error on /api/articles/:article_id/*', () => {
      return request
        .get(`/api/articles/${docs.articles[0]._id}/notAroute`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Sorry that page could not be found')
        })
    })
    it('Handles the error on /api/articles/:article_id?:page when page has no more articles', () => {
      return request
        .get(`/api/articles/${docs.articles[0]._id}/comments?page=6`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('Not a Valid ID/No More Comments')
        })
    })
    it('Handles the error on /api/topics/*', () => {
      return request
        .get(`/api/topics/notAroute`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Sorry that page could not be found')
        })
    })
    it('Handles the error on /api/topics/:topic/*', () => {
      return request
        .get(`/api/topics/cats/notAroute`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Sorry that page could not be found')
        })
    })
    it('Handles the error on /api/users/*', () => {
      return request
        .get(`/api/users/notAroute`)
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('Not a Valid User')
        })
    })
    it('Handles the error on /api/comments/*', () => {
      return request
        .get(`/api/comments/notAroute`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('cast error - try checking the url is correct before continuing')
        })
    })
  })
})
