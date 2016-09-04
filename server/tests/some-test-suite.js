describe('Some functionality', () => {
  it('works', function () {
    'hello'.should.equal('hello')

    function crappyFunction () { throw new Error('Fail!!!') }
    expect(crappyFunction).to.throw()

    return Promise.resolve('hello').should.eventually.equal('hello')
  })
})
