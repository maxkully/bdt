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
        // q
        // created_at[from]
        // created_at[to]
        // sort_by
        // direction
        // page
        // offset
        // limit
//        $repository = $this->getDoctrine()->getRepository(Subscriber::class);
//        $movies = $repository->findall();
        $response = [
            [ 'id' => 1, 'phone' => '+79123456781', 'locale' => 'ru', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 01, 2020)) ],
            [ 'id' => 2, 'phone' => '+79123456782', 'locale' => 'en', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 02, 2020)) ],
            [ 'id' => 3, 'phone' => '+79123456783', 'locale' => 'en', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 03, 2020)) ],
            [ 'id' => 4, 'phone' => '+79123456784', 'locale' => 'ru', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 04, 2020)) ],
            [ 'id' => 5, 'phone' => '+79123456785', 'locale' => 'ru', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 05, 2020)) ],
            [ 'id' => 6, 'phone' => '+79123456786', 'locale' => 'ru', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 06, 2020)) ],
        ];
        return $this->handleView($this->view($response));
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
//        $form = $this->createForm(SubscriberType::class, $object);
//        $data = json_decode($request->getContent(), true);
//        $form->submit($data);
//
//        if ($form->isSubmitted() && $form->isValid()) {
//            $em = $this->getDoctrine()->getManager();
//            $em->persist($object);
//            $em->flush();
//            return $this->handleView($this->view(['status' => 'ok'], Response::HTTP_CREATED));
//        }
//
//        return $this->handleView($this->view($form->getErrors()));
        $response = [ 'id' => 1, 'phone' => '+79123456781', 'locale' => 'ru', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 01, 2020)) ];
        return $this->handleView($this->view($response, Response::HTTP_CREATED));
    }

    /**
     * Update subscriber
     * @Rest\Get("/subscribers/{id}")
     * @param Request $request
     *
     * @return Response
     */
    public function showSubscriberAction(Request $request)
    {
        $result = [
            'id' => $request->attributes->get('id'),
            'phone' => '+79123456781',
            'locale' => 'ru',
            'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 01, 2020)),
            'services' => [
                [ 'id' => 11, 'title' => 'Auto Dialer', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 11, 2020)) ],
                [ 'id' => 12, 'title' => 'Auto Response', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 12, 2020)) ],
                [ 'id' => 13, 'title' => 'Auto Recorder', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 13, 2020)) ],
                [ 'id' => 14, 'title' => 'Auto Definer', 'created_at' => date('Y-m-d', mktime(0, 0, 0, 04, 14, 2020)) ],
            ]
        ];

        return $this->handleView($this->view($result));
    }

    /**
     * Update subscriber
     * @Rest\Put("/subscribers/{id}")
     * @param Request $request
     *
     * @return Response
     */
    public function updateSubscriberAction(Request $request)
    {
        return $this->handleView($this->view([], Response::HTTP_NO_CONTENT));
    }

    /**
     * Delete subscriber
     * @Rest\Delete("/subscribers/{id}")
     * @param Request $request
     *
     * @return Response
     */
    public function deleteSubscriberAction(Request $request)
    {
        return $this->handleView($this->view([], Response::HTTP_NO_CONTENT));
    }

    /**
     * Enable Service
     * @Rest\Put("/subscribers/{id}/services/{service_id}")
     * @param Request $request
     *
     * @return Response
     */
    public function enableServiceAction(Request $request)
    {
        return $this->handleView($this->view([], Response::HTTP_NO_CONTENT));
    }

    /**
     * Disable Service
     * @Rest\Delete("/subscribers/{id}/services/{service_id}")
     * @param Request $request
     *
     * @return Response
     */
    public function disableServiceAction(Request $request)
    {
        return $this->handleView($this->view([], Response::HTTP_NO_CONTENT));
    }
}
