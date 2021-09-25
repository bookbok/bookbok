<?php

namespace App\DB;

/**
 * @phpstan-template ENTITY_CLASS of \App\Entity\EntityInterface
 * @phpstan-template ID_TYPE
 */
abstract class AbstractQuery
{
    /** @phpstan-var class-string<ENTITY_CLASS> */
    protected static string $entityClass;
    protected static string $tableName;
    protected static string $primaryKey = 'id';

    /**
     * @phpstan-param ID_TYPE[] $ids
     * @phpstan-param Connection::SELECT_LOCKING_MODE_* $lockMode
     * @phpstan-return ENTITY_CLASS[]
     */
    public static function fetch(
        Connection $con,
        array $ids,
        string $lockMode = Connection::SELECT_LOCKING_MODE_NONE
    ): array {
        $table = static::$tableName;
        $primaryKey = static::$primaryKey;
        $query = "SELECT * FROM {$table} WHERE {$primaryKey} IN (:ids[])";
        $params = ['ids' => $ids];

        $records = $con->select($query, $params, $lockMode);
        // @phpstan-ignore-next-line
        return static::$entityClass::fromRecords($records);
    }

    /**
     * @phpstan-param ID_TYPE[] $ids
     */
    public static function delete(Connection $con, array $ids): void
    {
        $table = static::$tableName;
        $primaryKey = static::$primaryKey;
        $query = "DELETE {$table} WHERE {$primaryKey} IN (:ids[])";
        $params = ['ids' => $ids];

        $con->delete($query, $params);
    }
}
