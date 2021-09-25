<?php

namespace App\DB;

use App\Entity\Sample;

/**
 * @phpstan-extends AbstractQuery<Sample,positive-int>
 */
class SampleQuery extends AbstractQuery
{
    protected static string $entityClass = Sample::class;
    protected static string $tableName = 'sample';

    public static function insert(Connection $con, Sample $data, \DateTimeImmutable $createdAt): Sample
    {
        $id = $con->insertWillReturnLastInsertId(
            <<<SQL
                INSERT INTO sample
                (title, position, created_at, updated_at)
                VALUES
                (:title, :position, :created_at, :updated_at)
            SQL,
            [
                'title' => $data->getTitle(),
                'position' => $data->getPosition(),
                'created_at' => $createdAt->format('Y-m-d H:i:s'),
                'updated_at' => $createdAt->format('Y-m-d H:i:s'),
            ]
        );

        return $data->setId($id);
    }

    public static function update(Connection $con, Sample $data, \DateTimeImmutable $updatedAt): void
    {
        $id = $con->insertWillReturnLastInsertId(
            <<<SQL
                UPDATE sample
                SET
                    title = :title,
                    position = :position,
                    updated_at = :updated_at
                WHERE
                    id =
            SQL,
            [
                'id' => $data->getId() ?? throw new \LogicException(),
                'title' => $data->getTitle(),
                'position' => $data->getPosition(),
                'updated_at' => $updatedAt->format('Y-m-d H:i:s'),
            ]
        );
    }
}
