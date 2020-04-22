<?php

namespace BDT\Controller;

use BDT\Entity\Log;
use BDT\Entity\User;
use Hoa\Exception\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use BDT\Form\MobileServiceType;
use BDT\Entity\MobileService;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Movie controller.
 * @Route("/api", name="api_")
 */
class MobileServicesController extends AbstractFOSRestController
{
    /**
     * Lists all activities
     * @Rest\Get("/activities")
     *
     * @return Response
     */
    public function getActivityLog(UserPasswordEncoderInterface $encoder) {
        $response = [];

        $user = $this->getDoctrine()->getRepository('\BDT\Entity\User')->findOneBy(['email' => 'm.kulyaev@axioma.lv']);
        if (!$user) {
            $user = new User();
            $user->setEmail('m.kulyaev@axioma.lv');
            $user->setPassword($encoder->encodePassword($user, 'axioma'));
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
        }

        $objects = $this->getDoctrine()
            ->getRepository(Log::class)
            ->findAll();

        /** @var Log $obj */
        foreach ($objects as $obj) {
            $response[] = $obj->serialize();
        }

        return $this->handleView($this->view($response));
    }

    /**
     * Lists all services
     * @Rest\Get("/services")
     *
     * @return Response
     */
    public function getServicesAction(Request $request)
    {
        $response = [];
        $objects = $this->getDoctrine()
            ->getRepository(MobileService::class)
            ->findAll();

        /** @var MobileService $obj */
        foreach ($objects as $obj) {
            $response[] = $obj->serialize();
        }

        return $this->handleView($this->view($response));
    }

    /**
     * Create service
     * @Rest\Post("/services")
     * @param Request $request
     *
     * @return Response
     */
    public function createServiceAction(Request $request)
    {
        try {
            $obj = new MobileService();
            $data = json_decode($request->getContent(), true);
            $form = $this->createForm(MobileServiceType::class, $obj);
            $form->submit($data);
            if ($form->isSubmitted() && $form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $em->persist($obj);
                $em->flush();
                return $this->handleView($this->view($obj->serialize(), Response::HTTP_CREATED));
            }

            return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
        } catch (\Throwable $e) {
            return $this->handleView($this->view([
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR));
        }
    }

    /**
     * Update subscriber
     * @Rest\Get("/services/{id}")
     * @param Request $request
     *
     * @return Response
     */
    public function showServiceAction(Request $request)
    {
        /** @var MobileService $obj */
        $obj = $this->getDoctrine()->getRepository(MobileService::class)->find($request->get('id'));
        if (!$obj) {
            return $this->handleView($this->view([], Response::HTTP_NOT_FOUND));
        }

        return $this->handleView($this->view($obj->serialize(true)));
    }

    /**
     * Update service
     * @Rest\Put("/services/{id}")
     * @param Request $request
     *
     * @return Response
     */
    public function updateServiceAction(Request $request)
    {
        try {
            /** @var MobileService $obj */
            $obj = $this->getDoctrine()->getRepository(MobileService::class)->find($request->get('id'));
            if (!$obj) {
                return $this->handleView($this->view([], Response::HTTP_NOT_FOUND));
            }

            $data = json_decode($request->getContent(), true);
            $form = $this->createForm(MobileServiceType::class, $obj);

            $form->submit($data);
            if ($form->isSubmitted() && $form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $em->persist($obj);
                $em->flush();
                return $this->handleView($this->view([], Response::HTTP_NO_CONTENT));
            }

            return $this->handleView($this->view($form->getErrors(), Response::HTTP_BAD_REQUEST));
        } catch (\Throwable $e) {
            return $this->handleView($this->view([
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR));
        }
    }

    /**
     * Delete service
     * @Rest\Delete("/services/{id}")
     * @param Request $request
     *
     * @return Response
     */
    public function deleteServiceAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $obj = $em->getRepository(MobileService::class)->find($request->get('id'));

        if (!$obj) {
            return $this->handleView($this->view([], Response::HTTP_NOT_FOUND));
        }

        $em->remove($obj);
        $em->flush();

        return $this->handleView($this->view([], Response::HTTP_NO_CONTENT));
    }

    /**
     * Enable Service
     * @Rest\Put("/services/{id}/subscribers/{subscriber_id}")
     * @param Request $request
     *
     * @return Response
     */
    public function enableServiceAction(Request $request)
    {
        throw new Exception('Not implemented');
    }

    /**
     * Disable Service for Subscriber
     * @Rest\Delete("/services/{id}/subscribers/{subscriber_id}")
     * @param Request $request
     *
     * @return Response
     */
    public function disableServiceAction(Request $request)
    {
        throw new Exception('Not implemented');
    }
}
