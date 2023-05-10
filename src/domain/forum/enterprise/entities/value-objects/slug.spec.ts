import { Slug } from './slug'

test('it should be able to create a slug from text', () => {
  const slug = Slug.createFromText('Lá em cima')
  expect(slug.value).toBe('la-em-cima')
})
