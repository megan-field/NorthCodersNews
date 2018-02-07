process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../app');
const request = require('supertest')(app);
const seed = require('../seed/test.seed.js')

describe('API endpoints', function () {

    let docs;
    this.timeout(8000)
    before(function () {
        return mongoose.connection.dropDatabase()
            .then(seed)
            .then(usefulDocs => {
                docs = usefulDocs;
            });
    });

    after('', () => {
        mongoose.disconnect();
    })
    describe('/api', () => {
        it('GETs all topics', () => {
            return request
                .get('/api/topics/')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body.length).to.equal(3)
                    expect(res.body[0].title).to.eql('Football')
                    expect(res.body[1].title).to.eql('Cooking')
                    expect(res.body[2].title).to.eql('Cats')
                })
        })
        it('GETs all articles for a topic', () => {
            return request
                .get('/api/topics/cats/articles')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.be.an('object');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].belongs_to).to.equal('cats');
                    expect(res.body[0].body).to.be.a('string');
                    expect(res.body[0].title).to.be.a('string');
                })
        })
        it('GETs all articles', () => {
            return request
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    expect(res.body.length).to.equal(2)
                    expect(res.body[0].title).to.be.a('string')
                    expect(res.body[0].body).to.be.a('string')
                    expect(res.body[0]._id).to.equal(`${docs.articles[0]._id}`)
                })
        })
        it('GETs one article', () => {
            return request
                .get(`/api/articles/${docs.articles[0]._id}`)
                .expect(200)
                .then(res => {
                    expect(res.body[0]).to.be.an('object')
                    expect(res.body[0].body).to.be.a('string')
                    expect(res.body[0].belongs_to).to.equal('cats')
                })
        })
        it('GETs all the comments for an individual article', () => {
            return request
                .get(`/api/articles/${docs.articles[0]._id}/comments`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.comments.length).to.equal(2)
                    expect(res.body.comments[0].created_by).to.equal('northcoder')
                    expect(res.body.comments[0].body).to.be.a('string')
                })
        })
        it('GETs the specified user', () => {
            return request
                .get('/api/users/northcoder')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.a('array')
                    expect(res.body[0]).to.be.an('object')
                    expect(res.body[0].name).to.be.a('string')
                    expect(res.body[0].avatar_url).to.be.a('string')
                })
        })
        it('POSTs a new comment on a specific article', () => {
            return request
                .post(`/api/articles/${docs.articles[0]._id}/comments`)
                .send({ body: 'this is a NEW comment' })
                .expect(201)
                .then(res => {
                    expect(res.body.body).to.be.a('string')
                    return request
                        .get(`/api/articles/${docs.articles[0]._id}/comments`)
                        .then(res => {
                            expect(res.body.comments.length).to.equal(3)
                            expect(res.body.comments[2].body).to.equal('this is a NEW comment')
                        })
                })
        })
        it('PUT request for an article\'s vote, an UP vote', () => {
            return request
                .put(`/api/articles/${docs.articles[0]._id}`)
                .send({ vote: 'up' })
                .expect(201)
                .then(res => {
                    expect(res.body.votes).to.equal(0)
                    return request
                        .get(`/api/articles/${docs.articles[0]._id}`)
                        .then(res => {
                            expect(res.body[0].votes).to.equal(1)
                        })
                })
        })
        it('PUT request for an article\'s vote, a DOWN vote', () => {
            return request
                .put(`/api/articles/${docs.articles[0]._id}`)
                .send({ vote: 'down' })
                .expect(201)
                .then(res => {
                    expect(res.body.votes).to.equal(1)
                    return request
                        .get(`/api/articles/${docs.articles[0]._id}`)
                        .then(res => {
                            expect(res.body[0].votes).to.equal(0)
                        })
                })
        })
        it('GETs one comment with the comment id', () => {
            return request
                .get(`/api/comments/${docs.comments[0]._id}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.a('array')
                    expect(res.body[0]).to.be.a('object')
                    expect(res.body[0].body).to.equal('this is a comment')
                })
        })
        it('PUT request for a comment\'s vote, an UP vote', () => {
            return request
                .put(`/api/comments/${docs.comments[0]._id}`)
                .send({ vote: 'up' })
                .expect(201)
                .then(res => {
                    expect(res.body.votes).to.equal(0)
                    return request
                        .get(`/api/comments/${docs.comments[0]._id}`)
                        .then(res => {
                            expect(res.body[0].votes).to.equal(1)
                        })
                })
        })
        it('PUT request for a comment\'s vote, an DOWN vote', () => {
            return request
            .put(`/api/comments/${docs.comments[0]._id}`)
            .send({vote: 'down'})
            .expect(201)
            .then(res => {
                expect(res.body.votes).to.equal(1)
                return request
                .get(`/api/comments/${docs.comments[0]._id}`)
                .then(res =>  {
                    expect(res.body[0].votes).to.equal(0)
                })
            })
        })
        it('DELETEs a comment', () => {
            return request
            .delete(`/api/comments/${docs.comments[0]._id}`)
            .expect(202)
            .then(res => {
                expect(res.text).to.equal(`comment ${docs.comments[0]._id} was deleted`)
        })
        })
    })
})