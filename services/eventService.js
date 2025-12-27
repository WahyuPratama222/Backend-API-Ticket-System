import { prisma } from "../prisma/client.js";

const eventSelect = {
  id: true,
  title: true,
  location: true,
  capacity: true,
  availableSeat: true,
  price: true,
  status: true,
  date: true,
  createdAt: true,
  updatedAt: true,
};

// ===== Create Event =====
const createEventService = async (organizerId, data) => {
  const organizer = await prisma.user.findUnique({
    where: { id: organizerId },
    select: { role: true },
  });

  if (!organizer || organizer.role !== "organizer") {
    throw new Error("User tidak valid atau bukan organizer");
  }

  const event = await prisma.event.create({
    data: {
      organizerId,
      title: data.title,
      location: data.location,
      capacity: data.capacity,
      availableSeat: data.capacity,
      price: data.price,
      date: data.date,
      status: "available",
    },
    select: eventSelect,
  });

  return event;
};

// ===== Get All Events =====
const getAllEventService = async () => {
  const events = await prisma.event.findMany({
    select: eventSelect,
  });
  return events;
};

// ===== Get Event By ID =====
const getEventByIdService = async (id) => {
  const event = await prisma.event.findUnique({
    where: { id },
    select: eventSelect,
  });
  if (!event) throw new Error("Event tidak ditemukan");
  return event; 
};

// ===== Update Event =====
const updateEventService = async (eventId, organizerId, data) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      bookings: { where: { status: "success" }, select: { quantity: true } },
    },
  });

  if (!event) throw new Error("Event tidak ditemukan");
  if (event.organizerId !== organizerId) throw new Error("Bukan pemilik event");

  const totalBooked = event.bookings.reduce((sum, b) => sum + b.quantity, 0);

  const newCapacity = data.capacity ?? event.capacity;
  if (newCapacity < totalBooked) {
    throw new Error(`Capacity tidak boleh kurang dari ${totalBooked}`);
  }

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: {
      title: data.title,
      location: data.location,
      capacity: newCapacity,
      availableSeat: newCapacity - totalBooked,
      price: data.price,
      date: data.date,
      status: newCapacity - totalBooked === 0 ? "unavailable" : "available",
    },
    select: eventSelect,
  });

  return updatedEvent;
};

// ===== Soft Delete Event =====
const deleteEventService = async (eventId, organizerId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { organizerId, status: true },
  });

  if (!event) throw new Error("Event tidak ditemukan");
  if (event.organizerId !== organizerId) throw new Error("Bukan pemilik event");
  if (event.status !== "available") throw new Error("Event tidak tersedia");

  await prisma.event.update({
    where: { id: eventId },
    data: { status: "unavailable" },
  });
};

export {
  createEventService,
  getAllEventService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
};
