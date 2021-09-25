<?php

namespace App\Entity;

use DateTimeImmutable;

/**
 * @phpstan-implements EntityInterface<Sample,record-sample>
 */
class Sample implements EntityInterface
{
    public const TITLE_LENGTH = 100;

    public function __construct(
        /** @phpstan-var positive-int|null */
        private ?int $id,
        private string $title,
        /** @phpstan-var non-negative-int */
        private int $position,
        private DateTimeImmutable $createdAt,
        private DateTimeImmutable $updatedAt
    ) {
    }

    public static function fromRecord(array $record): Sample
    {
        return new Sample(
            $record['id'],
            $record['title'],
            $record['position'],
            new DateTimeImmutable($record['created_at']),
            new DateTimeImmutable($record['updated_at']),
        );
    }

    public static function fromRecords(array $records): array
    {
        return array_map([static::class, 'fromRecord'], $records);
    }

    /**
     * @phpstan-return positive-int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @phpstan-param positive-int $id
     */
    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @phpstan-return non-negative-int
     */
    public function getPosition(): int
    {
        return $this->position;
    }

    /**
     * @phpstan-param non-negative-int $position
     */
    public function setPosition(int $position): self
    {
        $this->position = $position;
        return $this;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): DateTimeImmutable
    {
        return $this->updatedAt;
    }
}
