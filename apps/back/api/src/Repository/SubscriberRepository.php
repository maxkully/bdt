<?php

namespace BDT\Repository;

use BDT\Entity\Subscriber;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class SubscriberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Subscriber::class);
    }

    public function list($filter, $sorting, $paging)
    {
        $em = $this->getEntityManager();
//
//        $field = 'created_at';
//        $direction = 'DESC';
//        $limit = 20;
//        $offset = 0;
//        $phone = '%%';
//        $from = date('Y-m-d h:i:s', strtotime("-1 days"));
//        $to = date('Y-m-d h:i:s');
//
//        $query = $em->createQuery('
//              SELECT s
//                FROM BDT\Entity\Subscriber s
//               WHERE s.phone LIKE :phone
//                 AND s.created_at BETWEEN :from AND :to
//            ORDER BY s.' . $field . ' ' . $direction . '
//               LIMIT :limit, :offset
//        ')->setParameter('phone', $phone)
//            ->setParameter('from', $from)
//            ->setParameter('to', $to)
//            ->setParameter('limit', $limit)
//            ->setParameter('offset', $offset);

        $query = $em->createQuery('
              SELECT s
                FROM BDT\Entity\Subscriber s
        ');

        return $query->getResult();
    }
}
