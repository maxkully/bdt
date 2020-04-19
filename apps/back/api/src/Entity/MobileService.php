<?php

namespace BDT\Entity;

use BDT\Entity\Traits\TimestampableTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="services")
 */
class MobileService {
    use TimestampableTrait;

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Assert\NotBlank()
     *
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=1000)
     * @Assert\NotBlank()
     */
    private $description;

    /**
     * @ORM\Column(type="smallint")
     * @Assert\NotBlank()
     */
    private $state;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }
}
