// Simulación de base de datos para Impulsos y Necesidades
export interface Necesidad {
  id: string;
  titulo_necesidad: string;
  descripcion_necesidad: string;
  tiempo_compromiso: string;
  dias_compromiso: string;
  estado_necesidad: 'Abierta' | 'Cubierta temporalmente' | 'Urgente';
  fecha_publicacion: string;
  orden_visual: number;
  activo: boolean;
  impulso_id: string;
}

export interface Impulso {
  id: string;
  nombre_impulso: string;
  descripcion_corta: string;
  imagen_principal: string;
  dias_horarios: string;
  direccion: string;
  whatsapp_contacto: string;
  orden_visual: number;
  activo: boolean;
  slug: string;
}

export const impulsosData: Impulso[] = [
  {
    id: '1',
    nombre_impulso: 'Papás Panaderos',
    descripcion_corta: 'Familias que se reúnen para crear panes artesanales con ingredientes naturales y mucho amor.',
    imagen_principal: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Viernes de 14:00 a 17:00 hs',
    direccion: 'Cocina comunitaria - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456789',
    orden_visual: 1,
    activo: true,
    slug: 'papas-panaderos'
  },
  {
    id: '2',
    nombre_impulso: 'Huerta Comunitaria',
    descripcion_corta: 'Cultivamos juntos alimentos orgánicos y enseñamos sobre la naturaleza y los ciclos de la tierra.',
    imagen_principal: 'https://images.pexels.com/photos/8535007/pexels-photo-8535007.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Sábados de 9:00 a 12:00 hs',
    direccion: 'Huerta escolar - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456790',
    orden_visual: 2,
    activo: true,
    slug: 'huerta-comunitaria'
  },
  {
    id: '3',
    nombre_impulso: 'Talleres de Arte',
    descripcion_corta: 'Espacios creativos donde niños y familias exploran diferentes expresiones artísticas.',
    imagen_principal: 'https://images.pexels.com/photos/8535159/pexels-photo-8535159.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Sábados de 14:00 a 17:00 hs',
    direccion: 'Atelier de arte - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456791',
    orden_visual: 3,
    activo: true,
    slug: 'talleres-arte'
  },
  {
    id: '4',
    nombre_impulso: 'Música y Movimiento',
    descripcion_corta: 'Encuentros musicales que nutren el alma y fortalecen la comunidad.',
    imagen_principal: 'https://images.pexels.com/photos/8535163/pexels-photo-8535163.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Domingos de 10:00 a 12:00 hs',
    direccion: 'Salón de música - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456792',
    orden_visual: 4,
    activo: true,
    slug: 'musica-movimiento'
  },
  {
    id: '5',
    nombre_impulso: 'Cuentacuentos',
    descripcion_corta: 'Narraciones que despiertan la imaginación y transmiten valores.',
    imagen_principal: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Viernes de 16:00 a 17:30 hs',
    direccion: 'Biblioteca escolar - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456793',
    orden_visual: 5,
    activo: true,
    slug: 'cuentacuentos'
  },
  {
    id: '6',
    nombre_impulso: 'Trabajos Manuales',
    descripcion_corta: 'Tejido, carpintería y otras actividades que desarrollan la destreza manual.',
    imagen_principal: 'https://images.pexels.com/photos/8613297/pexels-photo-8613297.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Miércoles de 18:00 a 20:00 hs',
    direccion: 'Taller de manualidades - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456794',
    orden_visual: 6,
    activo: true,
    slug: 'trabajos-manuales'
  },
  {
    id: '7',
    nombre_impulso: 'Festivales Estacionales',
    descripcion_corta: 'Celebraciones que honran los ritmos naturales y fortalecen la comunidad.',
    imagen_principal: 'https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Según calendario estacional',
    direccion: 'Patio principal - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456795',
    orden_visual: 7,
    activo: true,
    slug: 'festivales-estacionales'
  },
  {
    id: '8',
    nombre_impulso: 'Círculo de Padres',
    descripcion_corta: 'Espacios de encuentro, reflexión y apoyo mutuo entre las familias.',
    imagen_principal: 'https://images.pexels.com/photos/8535161/pexels-photo-8535161.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    dias_horarios: 'Primer sábado del mes de 19:00 a 21:00 hs',
    direccion: 'Sala de reuniones - Escuela Sol de Invierno, Mercedes',
    whatsapp_contacto: '+5491123456796',
    orden_visual: 8,
    activo: true,
    slug: 'circulo-padres'
  }
];

export const necesidadesData: Necesidad[] = [
  // Papás Panaderos
  {
    id: 'n1',
    titulo_necesidad: 'Voluntario para reparto de pan',
    descripcion_necesidad: 'Se necesita persona con vehículo para reparto de pan los viernes por la mañana. Incluye entrega a familias y puntos de venta en Mercedes.',
    tiempo_compromiso: '3 horas',
    dias_compromiso: 'Viernes',
    estado_necesidad: 'Urgente',
    fecha_publicacion: '2024-01-15',
    orden_visual: 1,
    activo: true,
    impulso_id: '1'
  },
  {
    id: 'n2',
    titulo_necesidad: 'Ayudante de panadería',
    descripcion_necesidad: 'Buscamos persona para ayudar en el amasado y horneado. No se requiere experiencia previa, enseñamos todo lo necesario.',
    tiempo_compromiso: '4 horas',
    dias_compromiso: 'Viernes',
    estado_necesidad: 'Abierta',
    fecha_publicacion: '2024-01-10',
    orden_visual: 2,
    activo: true,
    impulso_id: '1'
  },
  {
    id: 'n3',
    titulo_necesidad: 'Coordinador de pedidos especiales',
    descripcion_necesidad: 'Persona organizada para gestionar pedidos especiales de cumpleaños, eventos y celebraciones. Manejo básico de planillas.',
    tiempo_compromiso: '2 horas',
    dias_compromiso: 'Flexible',
    estado_necesidad: 'Abierta',
    fecha_publicacion: '2024-01-12',
    orden_visual: 3,
    activo: true,
    impulso_id: '1'
  },
  // Huerta Comunitaria
  {
    id: 'n4',
    titulo_necesidad: 'Especialista en compostaje',
    descripcion_necesidad: 'Buscamos persona con conocimientos en compostaje para enseñar a la comunidad y mantener nuestras composteras.',
    tiempo_compromiso: '2 horas',
    dias_compromiso: 'Sábados',
    estado_necesidad: 'Abierta',
    fecha_publicacion: '2024-01-08',
    orden_visual: 1,
    activo: true,
    impulso_id: '2'
  },
  {
    id: 'n5',
    titulo_necesidad: 'Cuidador de huerta en vacaciones',
    descripcion_necesidad: 'Necesitamos voluntarios para regar y cuidar la huerta durante las vacaciones escolares de verano.',
    tiempo_compromiso: '1 hora por día',
    dias_compromiso: 'Lunes a viernes por 2 semanas',
    estado_necesidad: 'Urgente',
    fecha_publicacion: '2024-01-20',
    orden_visual: 2,
    activo: true,
    impulso_id: '2'
  },
  // Talleres de Arte
  {
    id: 'n6',
    titulo_necesidad: 'Instructor de cerámica',
    descripcion_necesidad: 'Buscamos ceramista para dar talleres mensuales de modelado en arcilla para niños y adultos.',
    tiempo_compromiso: '3 horas',
    dias_compromiso: 'Una vez al mes',
    estado_necesidad: 'Abierta',
    fecha_publicacion: '2024-01-05',
    orden_visual: 1,
    activo: true,
    impulso_id: '3'
  },
  {
    id: 'n7',
    titulo_necesidad: 'Organizador de exposiciones',
    descripcion_necesidad: 'Persona con experiencia en montaje de exposiciones para organizar nuestras muestras trimestrales.',
    tiempo_compromiso: 'Día completo',
    dias_compromiso: 'Una vez por trimestre',
    estado_necesidad: 'Cubierta temporalmente',
    fecha_publicacion: '2024-01-03',
    orden_visual: 2,
    activo: true,
    impulso_id: '3'
  },
  // Música y Movimiento
  {
    id: 'n8',
    titulo_necesidad: 'Músico para acompañamiento',
    descripcion_necesidad: 'Buscamos músico con guitarra o piano para acompañar nuestros encuentros de canto familiar.',
    tiempo_compromiso: '2 horas',
    dias_compromiso: 'Domingos',
    estado_necesidad: 'Abierta',
    fecha_publicacion: '2024-01-18',
    orden_visual: 1,
    activo: true,
    impulso_id: '4'
  },
  // Círculo de Padres
  {
    id: 'n9',
    titulo_necesidad: 'Facilitador de grupos',
    descripcion_necesidad: 'Persona con experiencia en facilitación grupal para coordinar nuestros círculos de reflexión.',
    tiempo_compromiso: '3 horas',
    dias_compromiso: 'Primer sábado del mes',
    estado_necesidad: 'Urgente',
    fecha_publicacion: '2024-01-22',
    orden_visual: 1,
    activo: true,
    impulso_id: '8'
  },
  {
    id: 'n10',
    titulo_necesidad: 'Cuidador de niños durante reuniones',
    descripcion_necesidad: 'Necesitamos personas para cuidar a los niños mientras los padres participan en los círculos de reflexión.',
    tiempo_compromiso: '2 horas',
    dias_compromiso: 'Primer sábado del mes',
    estado_necesidad: 'Abierta',
    fecha_publicacion: '2024-01-25',
    orden_visual: 2,
    activo: true,
    impulso_id: '8'
  }
];

// Funciones helper para simular operaciones de base de datos
export const getImpulsos = (): Impulso[] => {
  return impulsosData.filter(impulso => impulso.activo).sort((a, b) => a.orden_visual - b.orden_visual);
};

export const getImpulsoBySlug = (slug: string): Impulso | undefined => {
  return impulsosData.find(impulso => impulso.slug === slug && impulso.activo);
};

export const getNecesidadesByImpulso = (impulsoId: string): Necesidad[] => {
  return necesidadesData
    .filter(necesidad => necesidad.impulso_id === impulsoId && necesidad.activo)
    .sort((a, b) => a.orden_visual - b.orden_visual);
};

export const getNecesidadById = (id: string): Necesidad | undefined => {
  return necesidadesData.find(necesidad => necesidad.id === id);
};