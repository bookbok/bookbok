<?php

namespace App\Entity;

trait EntityTrait
{
    public static function fromRecords(array $records): array
    {
        return array_map([static::class, 'fromRecord'], $records);
    }
}
