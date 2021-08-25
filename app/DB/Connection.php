<?php

namespace App\DB;

use Illuminate\Database\Connection as BaseConnection;
use Illuminate\Support\Facades\DB;
use LogicException;

class Connection
{
    /**
     * もし Master/Slave 構成になっても、レプリケーション遅延とかをいい感じに考えて切り替えてくれる。
     */
    private BaseConnection $connection;

    /** @phpstan-var non-negative-int 有効なトランザクションの数。ネスト可能なので */
    private int $transactions = 0;

    public function __construct(string $connectionName = null)
    {
        $this->connection = DB::connection($connectionName);
    }

    /**
     * @param int $attempts トランザクション内処理の最大試行回数。
     * @phpstan-template T
     * @phpstan-param callable($this): T $callback
     * @phpstan-return T
     */
    public function transaction(callable $callback, int $attempts = 1): mixed
    {
        $this->transactions++;
        $result = $this->connection->transaction(fn() => $callback($this), $attempts);
        $this->transactions = max(0, $this->transactions - 1); //@phpstan-ignore-line maxはintを返す
        return $result;
    }

    /**
     * @phpstan-return array<string,mixed>[]
     */
    public function select(string $query, array $bindings = [], bool $forceUseWritePdo = false): array
    {
        assert(str_starts_with(trim($query), 'SELECT'));

        return $this->connection->select($query, $bindings, !$forceUseWritePdo);
    }

    /**
     * @phpstan-return array<string,mixed>[]
     */
    public function selectForUpdate(string $query, array $bindings = []): array
    {
        assert(str_starts_with(trim($query), 'SELECT'));

        if ($this->transactions === 0) {
            throw new LogicException('for update はトランザクション中じゃないと呼べない');
        }

        return $this->connection->select($query . ' FOR UPDATE', $bindings, false);
    }

    /**
     * @return bool クエリの実行が成功したか
     */
    public function insert(string $query, array $bindings = []): bool
    {
        assert(str_starts_with(trim($query), 'INSERT'));

        return $this->connection->insert($query, $bindings);
    }


    /**
     * @return int 影響のあったレコードの数
     */
    public function update(string $query, array $bindings = []): int
    {
        assert(str_starts_with(trim($query), 'UPDATE'));

        return $this->connection->update($query, $bindings);
    }

    /**
     * @return int 影響のあったレコードの数
     */
    public function delete(string $query, array $bindings = []): int
    {
        assert(str_starts_with(trim($query), 'DELETE'));

        return $this->connection->delete($query, $bindings);
    }
}
