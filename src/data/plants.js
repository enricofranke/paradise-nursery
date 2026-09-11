/**
 * Product catalogue for Paradise Nursery.
 * Every plant has a stable `id` (used as Redux key), a numeric `cost` in USD
 * and belongs to exactly one category.
 */
export const plantCategories = [
  {
    id: 'air-purifying',
    name: 'Air Purifying Plants',
    plants: [
      {
        id: 'snake-plant',
        name: 'Snake Plant',
        image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
        description: 'Produces oxygen at night, improving air quality.',
        cost: 15,
      },
      {
        id: 'spider-plant',
        name: 'Spider Plant',
        image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
        description: 'Filters formaldehyde and xylene from the air.',
        cost: 12,
      },
      {
        id: 'peace-lily',
        name: 'Peace Lily',
        image: 'https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg',
        description: 'Removes mold spores and purifies the air.',
        cost: 18,
      },
      {
        id: 'boston-fern',
        name: 'Boston Fern',
        image: 'https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg',
        description: 'Adds humidity to the air and removes toxins.',
        cost: 20,
      },
      {
        id: 'rubber-plant',
        name: 'Rubber Plant',
        image: 'https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg',
        description: 'Easy to care for and effective at removing toxins.',
        cost: 17,
      },
      {
        id: 'aloe-vera',
        name: 'Aloe Vera',
        image: 'https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg',
        description: 'Purifies the air and has healing properties for skin.',
        cost: 14,
      },
    ],
  },
  {
    id: 'aromatic',
    name: 'Aromatic Fragrant Plants',
    plants: [
      {
        id: 'lavender',
        name: 'Lavender',
        image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop',
        description: 'Calming scent, used in aromatherapy.',
        cost: 20,
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop',
        description: 'Sweet fragrance, promotes relaxation.',
        cost: 18,
      },
      {
        id: 'rosemary',
        name: 'Rosemary',
        image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
        description: 'Invigorating scent, often used in cooking.',
        cost: 15,
      },
      {
        id: 'mint',
        name: 'Mint',
        image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126755_1280.jpg',
        description: 'Refreshing aroma, used in teas and cooking.',
        cost: 12,
      },
      {
        id: 'lemon-balm',
        name: 'Lemon Balm',
        image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg',
        description: 'Citrusy scent, relieves stress and promotes sleep.',
        cost: 14,
      },
      {
        id: 'hyacinth',
        name: 'Hyacinth',
        image: 'https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg',
        description: 'Hyacinth is a beautiful flowering plant known for its fragrant.',
        cost: 22,
      },
    ],
  },
  {
    id: 'medicinal',
    name: 'Medicinal Plants',
    plants: [
      {
        id: 'echinacea',
        name: 'Echinacea',
        image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-556941_1280.jpg',
        description: 'Boosts immune system, helps fight colds.',
        cost: 16,
      },
      {
        id: 'peppermint',
        name: 'Peppermint',
        image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496692_1280.jpg',
        description: 'Relieves digestive issues and headaches.',
        cost: 13,
      },
      {
        id: 'calendula',
        name: 'Calendula',
        image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg',
        description: 'Soothes skin and promotes healing.',
        cost: 12,
      },
      {
        id: 'chamomile',
        name: 'Chamomile',
        image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg',
        description: 'Promotes relaxation and improves sleep.',
        cost: 15,
      },
      {
        id: 'ginseng',
        name: 'Ginseng',
        image: 'https://cdn.pixabay.com/photo/2016/09/13/14/12/ginseng-1668205_1280.jpg',
        description: 'Improves energy and reduces stress.',
        cost: 25,
      },
      {
        id: 'turmeric',
        name: 'Turmeric',
        image: 'https://cdn.pixabay.com/photo/2017/01/23/12/16/turmeric-2002206_1280.jpg',
        description: 'Anti-inflammatory and antioxidant properties.',
        cost: 18,
      },
    ],
  },
]

/** Flat list of all plants across categories. */
export const allPlants = plantCategories.flatMap((category) => category.plants)
