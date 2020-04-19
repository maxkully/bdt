<?php

namespace BDT\Entity;

use BDT\Entity\Traits\TimestampableTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="subscribers")
 */
class Subscriber {
    use TimestampableTrait;

    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=15)
     * @Assert\NotBlank()
     *
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=2)
     * @Assert\NotBlank()
     *
     */
    private $locale;

    /**
     * @ORM\Column(type="string", length=30)
     * @Assert\NotBlank()
     */
    private $password;

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
