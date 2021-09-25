<?php

namespace App\Entity;

/**
 * @phpstan-template T of EntityInterface
 * @phpstan-template U
 */
interface EntityInterface
{
    /**
     * @phpstan-ignore-next-line type U is not subtype of native type array
     * @phpstan-param U $record
     * @phpstan-return T
     */
    public static function fromRecord(array $record): EntityInterface;

    /**
     * @phpstan-param U[] $records
     * @phpstan-return T[]
     */
    public static function fromRecords(array $records): array;

    /**
     * @ phpstan-ignore-next-line type mixed is not subtype of native type array.
     * @phpstan-return U
     */
    // public function toRecord(): array;
}
