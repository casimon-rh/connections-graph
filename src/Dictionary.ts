const names = [
  'Yo',
  'Familia',
  '+Familia/Amigos',
  'Justo',
  'Bedu',
  'Fundación',
  'Cultura',
  'Injuve',
  'Edinba',
  'Eventos',
  'Tiendas/Ventas'
]
export const getName = (id: number) => names[id - 1]

const familyName = [
  'Margarita Juarez',
  'Carlos Simon',
  'Abril Ruiz',
  'Jesus Sancez'
]

export const getFamily = (id: number) => familyName[id]