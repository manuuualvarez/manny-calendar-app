import { EditEventTypeForm } from "@/app/components/dashboard/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

type Params = Promise<{ eventTypeId: string; }>

const EditEventTypePage = async ({ params }: { params: Params }) => {
  const { eventTypeId } = await params;
  const data = await getData(eventTypeId);

  return (
    <EditEventTypeForm
      description={data.description}
      duration={data.duration}
      title={data.title}
      url={data.url}
      key={data.id}
      id={data.id}
      callProvider={data.videoCallSoftware}
    />
  );
};

export default EditEventTypePage;
