type bodyAppointment = {
  hour: string;
  day: string;
};

export const parseDateTime = (body: bodyAppointment) => {
  console.log(body);
  const [ano, mes, dia] = body.day.split("-").map(Number);
  const [horas, minutos, segundos] = body.hour.split(":").map(Number);

  return new Date(ano, mes - 1, dia - 1, horas, minutos, segundos);
};
