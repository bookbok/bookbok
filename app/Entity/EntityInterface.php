<?php

namespace App\Entity;

/**
 * @phpstan-template T
 */
interface EntityInterface
{
    /**
     * @phpstan-ignore-next-line type T is not subtype of native type array.
     * @phpstan-param T $record
     */
    public static function fromRecord(array $record): self;

    /**
     * @phpstan-ignore-next-line type mixed is not subtype of native type array.
     * @phpstan-return T
     */
    public function toRecord(): array;
}
