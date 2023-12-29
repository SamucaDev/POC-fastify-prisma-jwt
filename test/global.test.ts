import { after, before, describe } from "node:test";

describe('Initializer test', () => {
  before(()=>{
    console.log('Eu fui o primeiro a aparecer')
  })

  after(()=>{
    console.log('Eu fui o Ultimo a aparecer')
  })
})