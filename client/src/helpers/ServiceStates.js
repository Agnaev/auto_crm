export const serviceStates = {
  created: 'Клиент записался', // клиент записался на оказание услуги
  in_service: 'Клиент в сервисе', // клиент в автосервисе
  service_provided: 'Услуга оказана', // услуга успешно оказана
  service_canceled: 'Услуга отменена' // услуга не оказана
}

export function getMessageByState (state) {
  return serviceStates[state]
}
