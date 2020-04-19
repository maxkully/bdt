<?php

namespace BDT\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use BDT\Entity\Subscriber;
use BDT\Form\SubscriberType;

/**
 * Movie controller.
 * @Route("/api", name="api_")
 */
class SubscribersController extends AbstractFOSRestController
{
    /**
     * Lists all subscribers
     * @Rest\Get("/subscribers")
     *
     * @return Response
     */
    public function getSubscribersAction()
    {
        $repository = $this->getDoctrine()->getRepository(Subscriber::class);
        $movies = $repository->findall();
        return $this->handleView($this->view($movies));
    }
    /**
     * Create subscriber.
     * @Rest\Post("/subscribers")
     * @param Request $request
     *
     * @return Response
     */
    public function postSubscriberAction(Request $request)
    {
        $object = new Subscriber();
        $form = $this->createForm(SubscriberType::class, $object);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($object);
            $em->flush();
            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
        }

        return $this->handleView($this->view($form->getErrors()));
    }
}
