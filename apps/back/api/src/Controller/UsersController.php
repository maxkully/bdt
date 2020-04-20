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
class UsersController extends AbstractFOSRestController
{
    /**
     * Login
     * @Rest\Post("/login")
     *
     * @return Response
     */
    public function loginAction()
    {
        $response = [200 => 'Logged In'];
        return $this->handleView($this->view($response));
    }

    /**
     * Login
     * @Rest\Post("/logout")
     *
     * @return Response
     */
    public function logoutAction()
    {
        $response = [200 => 'Logged Out'];
        return $this->handleView($this->view($response));
    }
}
